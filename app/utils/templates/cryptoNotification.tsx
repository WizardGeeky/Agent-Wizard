import { transporter } from "@/app/config/nodemailer.config";

const sendCryptoNotification = async (to: string, body: string) => {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    to,
    subject: "🚀 Agent Wizard: Crypto Monitoring Alert",
    html: `
      <div style="background-color:#f5f7fa; padding:40px; font-family:Arial, sans-serif; color:#333;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#007bff,#00c6ff); color:#fff; padding:20px; text-align:center;">
            <h1 style="margin:0; font-size:22px;">🔔 Crypto Alert</h1>
          </div>
          
          <!-- Body -->
          <div style="padding:30px;">
            <p style="font-size:16px; margin:0 0 15px;">Hello Trader,</p>
            <p style="font-size:15px; line-height:1.6;">${body}</p>
            
            <div style="margin:25px 0; text-align:center;">
              <a href="#" style="background:#007bff; color:#fff; text-decoration:none; padding:12px 20px; border-radius:6px; font-size:15px; font-weight:bold; display:inline-block;">
                View Dashboard
              </a>
            </div>
            
            <p style="font-size:13px; color:#555; line-height:1.5;">
              Stay updated with the latest crypto movements. <br/>
              Keep an eye on your assets and trade wisely!
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background:#f1f3f6; padding:15px; text-align:center; font-size:12px; color:#777;">
            <p>Agent Wizard © ${new Date().getFullYear()} | Automated Crypto Notifications</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Crypto alert email`);
  } catch (error) {
    console.error("❌ Error sending crypto alert email");
  }
};

export { sendCryptoNotification };
