export function assetUrl(path) {
  if (typeof path !== 'string') return '';
  const value = path.trim();
  if (!value || /^(https?:|mailto:|#)/i.test(value)) return value;
  if (/^[a-z][a-z\d+.-]*:/i.test(value)) return '';
  return `${import.meta.env.BASE_URL}${value.replace(/^\/+/, '')}`;
}
