"use server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { google } from "googleapis";
import { getServerSession } from "next-auth";

const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

type Recipient = {
  email: string;
  name: string;
};

function createEmailMessage(
  from: string,
  to: string,
  subject: string,
  body: string,
  base64Image: string
) {
  const prefixRegex = /^data:image\/[a-z]+;base64,/i;
  const strippedBase64Image = base64Image.replace(prefixRegex, "");

  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    `From: <${from}>`,
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/related; boundary="email_parts_boundary"`,
    "",
    "--email_parts_boundary",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    body,
    "",
    "--email_parts_boundary",
    `Content-Type: image/png`,
    "Content-Transfer-Encoding: base64",
    `Content-ID: <unique-image>`,
    "",
    strippedBase64Image,
    "--email_parts_boundary--",
  ];
  const message = messageParts.join("\r\n");

  // The body needs to be base64url encoded
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encodedMessage;
}

export async function sendEmail(
  recipient: Recipient,
  emailSubject: string,
  emailBody: string,
  base64Image: string
) {
  if (!clientId || !clientSecret)
    throw new Error("clientId & clientSecret are missing");

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Missing access token");
  if (!session.user?.email) throw new Error("Could not find user's email");

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost:3000/api/auth/callback/google"
  );

  oauth2Client.setCredentials({ access_token: session.accessToken });
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const uniqueEmailBody = emailBody.replace(/(##guest##)/g, recipient.name);

  const emailMessage = createEmailMessage(
    session.user!.email!,
    recipient.email,
    emailSubject,
    uniqueEmailBody,
    base64Image
  );

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: emailMessage,
      },
    });
    return "success";
  } catch (err) {
    return "error";
  }
}
