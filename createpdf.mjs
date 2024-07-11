import PuppeteerHTMLPDF from 'puppeteer-html-pdf';

const htmlPDF = new PuppeteerHTMLPDF();
const options = {
  format: 'A4',
  path: 'sample.pdf', // you can pass path to save the file
};
htmlPDF.setOptions(options);
const name = 'Umar Farooq Khan'
const content = `  <style>
    body {
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f5f5f5;
      flex-direction: column;
    }

    .main {
      text-align: center;
      max-width: 800px;

    }

    ol {
        text-align: left;
        margin: 0 auto 20px auto;
        padding: 0 20px;
      }
    .canvas {
      border: 1px solid #000;
      background: #fff;
    }

    .bottom {
      margin-top: 20px;
    }
  </style>
  <div id="wholediv">
      <h3 id="nda">NDA</h3>
      <ol id="list">
    <li>This Non-Disclosure Agreement ("Agreement") is entered into as of 16th June 2024, by and between <b> ${name} </b> and <b>Richard Shattock.</b> The address of <%= fname %> is <b><%= address %></b>
</li>
        <li>Parties Involved: The parties to this Agreement are Umar and Richard.
</li>
        <li>Definition of Confidential Information: "Confidential Information" means all information regarding the invention disclosed by Disclosing Party to Receiving Party.
</li>
        <li>Purpose of Disclosure: The Confidential Information will be disclosed for the purpose of sharing the invention.
</li>
        <li>Obligations of the Receiving Party: The Receiving Party agrees to hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.
</li>
        <li>Duration of Confidentiality: The obligations of this Agreement shall be effective as of the date first written above and shall continue for a period of [Number] years.
</li>
        <li>Exclusions from Confidentiality: Confidential Information does not include information which (a) is in the public domain at the time of disclosure, (b) becomes part of the public domain through no fault of the Receiving Party, (c) is disclosed with the prior written approval of the Disclosing Party, or (d) is disclosed pursuant to the order or requirement of a court, administrative agency, or other governmental body.
</li>
        <li>Permitted Disclosures: Receiving Party may disclose the Confidential Information to its employees or advisors on a need-to-know basis provided they are bound by confidentiality obligations.
</li>
        <li>Return or Destruction of Materials: Upon request by the Disclosing Party, the Receiving Party shall return or destroy all materials containing Confidential Information.
</li>
        <li>No License Granted: Nothing in this Agreement is intended to grant any rights to the Receiving Party under

</li>        <!-- Rest of your agreement details -->
      </ol>
    </div>
      </div>

`;

try {
  await htmlPDF.create(content);
} catch (error) {
  console.log('PuppeteerHTMLPDF error', error);
}
