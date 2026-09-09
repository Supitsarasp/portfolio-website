export const CONTACT_LIMITS = Object.freeze({ name: 100, email: 180, subject: 150, message: 1500 });

export function validateContactForm(form) {
  const values = Object.fromEntries(Object.keys(CONTACT_LIMITS).map(key => [key, typeof form?.[key] === 'string' ? form[key].trim() : '']));
  const labels = { name: 'ชื่อผู้ติดต่อ', email: 'อีเมลตอบกลับ', subject: 'หัวข้อ', message: 'ข้อความ' };
  for (const key of Object.keys(CONTACT_LIMITS)) {
    if (!values[key]) return { valid: false, message: `กรุณากรอก${labels[key]}` };
    if (values[key].length > CONTACT_LIMITS[key]) return { valid: false, message: `${labels[key]}ยาวเกิน ${CONTACT_LIMITS[key]} ตัวอักษร` };
  }
  if (/\r|\n/.test(values.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return { valid: false, message: 'กรุณากรอกอีเมลตอบกลับให้ถูกต้อง' };
  return { valid: true, values };
}

export function createEmailDraft(recipient, form) {
  const { values } = validateContactForm(form);
  if (!values) return '';
  const body = `ชื่อผู้ติดต่อ: ${values.name}\nอีเมลตอบกลับ: ${values.email}\n\n${values.message}`;
  return {
    body,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`,
    mailto: `mailto:${recipient}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`,
    preview: `ถึง: ${recipient}\nเรื่อง: ${values.subject}\n\n${body}`,
  };
}
