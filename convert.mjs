import fs from 'fs';
import pdf2img from 'pdf-img-convert';

async function convert() {
  try {
    const pdfArray = await pdf2img.convert('./public/cybersecurity_cert.pdf', {
      width: 800,
      page_numbers: [1]
    });
    
    fs.writeFileSync('./public/cybersecurity_cert.png', pdfArray[0]);
    console.log("Successfully created cybersecurity_cert.png");
  } catch (err) {
    console.error("Error converting PDF:", err);
  }
}

convert();
