const express = require("express");

const router = express.Router();

const authC = require("../controllers/authController");
const creditsC = require("../controllers/creditsController");
const surveyC = require('../controllers/surveyController')
const webhookC = require('../controllers/webhookContoller')

// /api/routes
router
  .route("/")
  .get(authC.isLogedIn, surveyC.getSurvey)
  .post(authC.isLogedIn, creditsC.isEnoughCredits, surveyC.newSurvey);

router
  .route("/webhooks")
  .post(webhookC.getChoice);

router
  .route("/:id/:choice")
  .get((req, res) => {
    res.send("Thanks for voting!");

    // TODO: create a nice redirect page for Thanks
    // like redirect to special url, etc.
  });

module.exports = router;
