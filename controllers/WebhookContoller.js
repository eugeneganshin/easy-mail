const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");


class WebhookController {
    constructor(io) {
        this.io = io
    }

    getChoice = async (req, res) => {
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
            .each(async ({ surveyId, email, choice }) => {
                const updS = await Survey.findOneAndUpdate({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: true }, // test to true
                    },
                }, {
                    $inc: { [choice]: 1 },
                    $set: { "recipients.$.responded": true },
                    $lastResponded: new Date(),
                }, {
                    new: true
                })
                    .populate("_user")
                    .select("-recipients")
                    .exec()
                // Returns null if filter did not matched.
                await this.io.emit('action', { type: 'SOCKET_SERVER: CLIENT_CHOICE', payload: updS })
                // This goes to surveys. Not socket.
                // TODO: Send the client notification via telegram.
            })
            .value();
        res.send({});
    }
}

module.exports = WebhookController