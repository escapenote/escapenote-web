export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const numberWithComma = (num: string | number = 0) => {
  return Number(num).toLocaleString();
};
