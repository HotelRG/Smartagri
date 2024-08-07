// Ensure you have required dotenv for environment variables
require('dotenv').config();

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const createsms = async (req, res) => {
  const { to, message } = req.body;
  console.log(to,message)

  let msgOptions={
    from: process.env.TWILIO_PHONE_NUMBER,  
    to: to,
    body: message,
  }


  try {
      const twilioMessage = await client.messages.create(msgOptions);
        console.log(twilioMessage)
      res.json({ success: true, messageSid: twilioMessage.sid });
  } catch (error) {
      console.error("Error sending SMS:", error);  // Log the error to the server console
      res.status(500).json({ success: false, error: error.message });
  }
};
  module.exports = {
    createsms,
  };
  