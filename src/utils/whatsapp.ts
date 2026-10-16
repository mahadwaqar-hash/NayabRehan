import { designerData } from '../data/portfolioData';

/**
 * Generate a clean WhatsApp link
 */
export function createWhatsAppUrl(message: string, phone: string = designerData.whatsappNumber): string {
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '92' + cleanPhone.slice(1);
  }
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

/**
 * Generate inquiry message from contact form
 */
export function formatContactInquiryMessage(data: {
  name: string;
  phone: string;
  inquiryType: string;
  targetCollection: string;
  notes: string;
}): string {
  return `*NAYAB REHAN — CLIENT INQUIRY*
• Client Name: ${data.name}
• Client WhatsApp: ${data.phone}
• Inquiry Type: ${data.inquiryType}
• Collection / Interest: ${data.targetCollection}

*Client Notes:*
${data.notes || 'Inquiring regarding custom orders and collection availability.'}

— Dispatched via Nayab Rehan Portfolio`;
}
