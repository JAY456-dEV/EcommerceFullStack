import { mailOptions, transporter } from "../../lib/nodeMailer";

const generateEmailContent = (data) => {
  const stringData = `
      First Name: ${data.firstName}
      Last Name: ${data.lastName}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      Address: ${data.address}
      City: ${data.city}
      State: ${data.state}
      Zip Code: ${data.zipCode}
      Country: ${data.country}

      Thank you for your submission.
  `;

  const htmlData = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          .container {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 600px;
              margin: auto;
              border: 1px solid #ddd;
          }
          .form-heading {
              font-size: 18px;
              font-weight: bold;
              color: #333;
          }
          .form-answer {
              font-size: 16px;
              color: #555;
              margin-bottom: 15px;
          }
          .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #888;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Submission Details</h2>

          <h3 class="form-heading">First Name:</h3>
          <p class="form-answer">${data.firstName}</p>

          <h3 class="form-heading">Last Name:</h3>
          <p class="form-answer">${data.lastName}</p>

          <h3 class="form-heading">Email:</h3>
          <p class="form-answer">${data.email}</p>

          <h3 class="form-heading">Phone Number:</h3>
          <p class="form-answer">${data.phoneNumber}</p>

          <h3 class="form-heading">Address:</h3>
          <p class="form-answer">${data.address}</p>

          <h3 class="form-heading">City:</h3>
          <p class="form-answer">${data.city}</p>

          <h3 class="form-heading">State:</h3>
          <p class="form-answer">${data.state}</p>

          <h3 class="form-heading">Zip Code:</h3>
          <p class="form-answer">${data.zipCode}</p>

          <h3 class="form-heading">Country:</h3>
          <p class="form-answer">${data.country}</p>

          <div class="footer">
              <p>Thank you for your submission.</p>
          </div>
      </div>
  </body>
  </html>
  `;

  return {
    text: stringData,
    html: htmlData
  };
};


export default async function mailHandler(req, res) {
  console.log('Received Request:', req.method, req.body);

  if (req.method === 'POST') {
    const { userAddress } = req.body;
    console.log('Mail Data:', userAddress);

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "Payment Confirmation",
        ...generateEmailContent(userAddress),
        // text: `Payment confirmation for address: ${userAddress}`,
        // html: `<h1>Payment Success</h1><p>Thank you for your purchase!</p>`
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log('Mail Error:', error);
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
