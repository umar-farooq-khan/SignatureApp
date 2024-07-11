import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import path from 'path';
import { fileURLToPath } from 'url';
import PuppeteerHTMLPDF from 'puppeteer-html-pdf';
const htmlPDF = new PuppeteerHTMLPDF();
const options = {
  format: 'A4',
  path: 'sample.pdf', // you can pass path to save the file
};
htmlPDF.setOptions(options);

const API_KEY = 
sgMail.setApiKey(API_KEY);

const app = express();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit if needed

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Endpoint to serve NDA invitation form
app.get('/nda-invitation', async (req, res) => {
  console.log('Call received on NDA invitation form');
  res.sendFile(path.join(__dirname, 'public/nda_details_form.html'));
});

app.post('/sign-nda', async (req, res) => {
  console.log('Call received on sign NDA form');
  console.log(req.body.fname);
  res.render('create_nda', {fname: req.body.fname , address: req.body.addressLine1 +', '+ req.body.addressLine2 +', '+  req.body.zipCode +', '+ req.body.country});
});



app.post('/createndapdf', async (req, res) =>
{

  const { image, html } = req.body;
 console.log('Call received on create pdf and image received' );
try {
  const htmlContent = `
    ${html}
    <img style="width:250px ; height: auto" src="${image}" alt="Signature" />`;
  await htmlPDF.create(htmlContent);
    console.log('done');

} catch (error) {
  console.log('PuppeteerHTMLPDF error', error);
}

});



// Endpoint to send email (if needed)
app.post('/send-mail', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  console.log(name);
  console.log(email);

  const message = {
    to: email,
    from: 'nondisclosure@clearip.ai',
    subject: 'Invitation for NDA',
    html: `You are being invited for an invention. Please follow the steps and sign NDA to get involved in the invention.
    http://localhost:8000/nda-invitation
    `
  };

  try {
    await sgMail.send(message);
    console.log('Email sent');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
