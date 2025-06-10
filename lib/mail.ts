import { Resend } from "resend";
import { verifySendEmailOtpTemplate } from "./utils/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (
  email: string,
  name: string,
  code: string,
) => {
  await resend.emails.send({
    from: "kasirku <onboarding@resend.dev>",
    to: email,
    subject: "OTP Verification",
    html: verifySendEmailOtpTemplate(name, code),
  });
};
