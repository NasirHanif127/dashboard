import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nasir127sb@gmail.com",
    pass: "nkwosymxkzsbvlgs"
  }
});

const sendMail = async (data)=>{
 
  var mailOptions = {
    from: "nasir127sb@gmail.com",
    to: data.to,
    subject: data.subject,
    text: data.message
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  }
  catch(err)
  {
    return false;
  }
}

export {
  sendMail
}
