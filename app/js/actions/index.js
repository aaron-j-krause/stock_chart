export const changeStock = (stock) => {
  console.log('DISPATCH', stock);
  return {type: 'CHANGE_STOCK', stock};
};
