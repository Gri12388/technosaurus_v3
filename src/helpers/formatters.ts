export const formatNumber = (value: number) => value.toLocaleString('ru');

export const formatProduct = (value: number) => {
  const hundred = value % 100;
  const ten = value % 10;
  if (hundred >= 10 && hundred < 20) return 'товаров';
  if (ten === 1) return 'товар';
  if (ten > 1 && ten < 5) return 'товара';
  return 'товаров';
};
