export const decodeHtml = (html: string) => {
  if (!html) return '';
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const formatPrice = (price: string) => {
  if (!price) return '';
  const num = parseFloat(price);
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
};
