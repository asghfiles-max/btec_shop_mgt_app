const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoicePdf(invoice, items) {
  const filename = `invoice_${invoice.id}_${Date.now()}.pdf`;
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const outputPath = path.join(uploadsDir, filename);
  const doc = new PDFDocument({ margin: 50 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${invoice.id}`);
  doc.text(`Customer ID: ${invoice.customer_id}`);
  doc.text(`Date: ${invoice.created_at}`);
  doc.text(`Total: ${invoice.total_amount}`);
  doc.moveDown();

  doc.fontSize(14).text('Items');
  items.forEach(item => {
    doc.fontSize(12).text(`${item.quantity} x ${item.description} @ ${item.unit_price}`);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve({ path: outputPath, filename }));
    stream.on('error', reject);
  });
}

module.exports = { generateInvoicePdf };
