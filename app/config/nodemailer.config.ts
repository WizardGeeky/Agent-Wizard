import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    pass: process.env.NEXT_PUBLIC_BURNER_PASSWORD,
  },
});


