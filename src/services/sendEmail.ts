interface Email {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(body: Email, apiKey: string) {
  const API_KEY = process.env.API_KEY;
  const url = "https://api.brevo.com/v3/smtp/email";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey ?? API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Notification", email: "esalu88@outlook.com" },
      params: { NAME: body.name, EMAIL: body.email, MESSAGE: body.message },
      to: [{ email: "esalu88@outlook.com", name: "Emilio" }],
      templateId: 1,
    }),
  };
  const response = await fetch(url, options);

  return response.ok;
}
