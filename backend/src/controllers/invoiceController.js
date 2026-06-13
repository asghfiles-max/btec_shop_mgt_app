const invoiceService = require('../services/invoiceService');
const pdfService = require('../services/pdfService');

async function createInvoice(req, res, next) {
  try {
    const invoice = await invoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
}

async function getInvoice(req, res, next) {
  try {
    const invoice = await invoiceService.getInvoice(req.params.id);
    res.json(invoice);
  } catch (error) {
    next(error);
  }
}

async function downloadInvoicePdf(req, res, next) {
  try {
    const invoice = await invoiceService.getInvoice(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    const pdf = await pdfService.generateInvoicePdf(invoice, invoice.invoice_items || []);
    res.download(pdf.path, pdf.filename);
  } catch (error) {
    next(error);
  }
}

module.exports = { createInvoice, getInvoice, downloadInvoicePdf };
