const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const router = express.Router();

const authC = require("../controllers/authControll");
const creditsC = require("../controllers/creditsControll");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/suveyTemplate");
const { route } = require("./authRoutes");

const Survey = mongoose.model("surveys");

// /api/routes
router
  .route("/")
  .get(authC.isLogedIn, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .populate("_user")
      .select("-recipients");

    res.send(surveys);
  })
  .post(authC.isLogedIn, creditsC.isEnoughCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      _user: req.user.id,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      dateSent: Date.now(),
    });

    // SENDGRID
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();

      // DB
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

router.route("/webhooks").post((req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  _.chain(req.body)
    .map((event) => {
      const match = p.test(new URL(event.url).pathname);

      if (match)
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          $lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

router.route("/:id/:choice").get((req, res) => {
  res.send("Thanks for voting!");

  // TODO: create a nice redirect page for Thanks
  // like redirect to special url, etc.
});

module.exports = router;
