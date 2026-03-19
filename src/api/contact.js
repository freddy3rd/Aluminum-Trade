import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: "alumcraft49@gmail.com",
      to: "alumcraft49@gmail.com",
      replyTo: "alumcraft49@gmail.com",
      subject: "📩 New Quote Request",
      html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        
        <h2 style="color:#111;">New Quote Request</h2>
        <p>You have received a new quotation inquiry from your website.</p>

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

        <h3 style="margin-bottom:10px;">Client Information</h3>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

        <h3 style="margin-top:20px;margin-bottom:10px;">Project Details</h3>

        <p style="white-space:pre-line;">
          ${message}
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:25px 0;" />

        <p style="font-size:12px;color:#777;">
          This email was automatically sent from your website quote request form.
        </p>

      </div>
    `,
    });

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return res.status(500).json({
      error: "Email failed",
      message: err.message,
    });
  }
}
