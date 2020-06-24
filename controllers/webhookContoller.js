const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");


// io.on("connection", (socket) => {
//     console.log('New connection')

//     socket.on('disconnect', () => {
//       console.log('Disconnected')
//     })
//   });

exports.getChoice = (req, res) => {
    console.log(req.body)
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
            // Send the client notification via telegram.
        })
        .value();

    // Emit the result to the client side via socket.
    res.send({});
}