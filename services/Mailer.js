const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
	constructor({ subject, recipients }, content) {
		this.subject = subject;
		this.recipients = recipients.map(({ email }) => email);
		this.content = content;
		this.isMultiple = true;

		console.log(subject, recipients, content);

		sgMail.setApiKey(keys.SEND_GRID_ADDITIONAL_KEY_YANDEX);

		if (this.recipients.length === 1) {
			this.recipients = this.recipients[0];
			this.isMultiple = false;
		}

		this.msg = {
			to: this.recipients,
			from: 'eganshin@gmail.com',
			subject: subject,
			html: content,
			trackingSettings: {
				clickTracking: {
					enable: true,
				},
				openTracking: {
					enable: true,
				},
			},
			isMultiple: this.isMultiple,
		};
	}

	async send() {
		try {
			if (!this.recipients.length) {
				return null;
			}

			const res = await sgMail.send(this.msg);
			return res;
		} catch (error) {
			console.log(error.response.body);
		}
	}
}

module.exports = Mailer;
