export const formatCurrency = (val: number) => {
  return `${parseFloat(''+val).toFixed(2)} €`;
};

export const formatNumber = (val: number) => {
  return parseFloat(''+val).toFixed(2);
};