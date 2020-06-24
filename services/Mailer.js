const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')

class Mailer {
  constructor({ subject, recipients }, content) {
    this.subject = subject
    this.recipients = recipients.map(({ email }) => email)
    this.content = content
    this.isMultiple = true

    sgMail.setApiKey(keys.SEND_GRID_ADDITIONAL_KEY)

    if (this.recipients.length === 1) {
      this.recipients = this.recipients[0]
      this.isMultiple = false
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
    }
  }

  async send() {
    try {
      if (!this.recipients.length) {
        return null
      }

      const res = await sgMail.send(this.msg)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Mailer

// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super()

//     this.from_email = new helper.Email('e.s.ganshin.study@gmail.com')
//     this.subject = subject
//     this.body = helper.Content('text/html', content)
//     this.recipients = recipients.map(({ Email }) => {
//       return new helper.Email(Email)
//     })

//     this.addContent(this.body)
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.trackingSettings()
//     const clickTracking = new helper.ClickTracking(true, true)

//     trackingSettings.setClicktracking(clickTracking)
//     this.addTrackingSettings(trackingSettings)
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization()
//     this.recipients.forEach((r) => {
//       personalize.addTo(r)
//     })
//     this.addPersonalization(personalize)
//   }
// }

// class Mailer {
//   constructor({ subject, recipients }, content) {
//     this.subject = subject
//     this.recipients = recipients.map(({ email }) => email)
//     this.content = content
//     this.multiple = true

//     if (this.recipients.length === 1) {
//       this.recipients = this.recipients[0]
//       this.multiple = false
//     }

//     this.msg = {
//       to: this.recipients,
//       from: 'e.s.ganshin.study@gmail.com',
//       subject: subject,
//       html: content,
//       trackingSettings: {
//         clickTracking: {
//           enable: true,
//         },
//       },
//     }

//     sgMail.send(msg)
//   }
// }
