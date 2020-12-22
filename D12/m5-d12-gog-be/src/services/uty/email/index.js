const sgMail = require("@sendgrid/mail")

module.exports = async (emailAddress, attachment) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY) // my personal token

    const myFile64 = attachment.toString("base64") // nodejs knows how to translate binary files into base64 strings
    const msg = {
      to: emailAddress,
      from: process.env.SENDER_EMAIL,
      subject: "whatever",
      text: "whatever",
      attachments: [
        {
          content: myFile64, // file itself in the form of a base64 string
          type: "plain/text",
          filename: "whatever.pdf",
          disposition: "attachment",
        },
      ],
    }

    await sgMail.send(msg)
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}
