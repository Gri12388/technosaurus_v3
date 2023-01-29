import { COLOR_PROP_ID } from '@/constants/constants';
import {
  ColorType,
  OfferType,
  ProdCardType,
} from '@/types/types';

export const formatNumber = (value: number) => value.toLocaleString('ru');

export const formatProduct = (value: number) => {
  const hundred = value % 100;
  const ten = value % 10;
  if (hundred >= 10 && hundred < 20) return 'товаров';
  if (ten === 1) return 'товар';
  if (ten > 1 && ten < 5) return 'товара';
  return 'товаров';
};

export const formatColors = (colors: ColorType[], offers: OfferType[]) => colors.reduce((acc: ColorType[], c) => {
  const found = offers.find((o) => {
    const locale = 'ru';
    const config = { sensitivity: 'case' };
    const offer = o.value.toLocaleLowerCase();
    const color = c.title.toLocaleLowerCase();
    return offer.localeCompare(color, locale, config) === 0;
  });
  if (found) {
    const copy = { ...c };
    copy.offer = found;
    return [...acc, copy];
  } else return acc;
}, []);

export const formatCards = (cards: ProdCardType[]) => cards.reduce((acc: ProdCardType[], c) => {
  if (c.mainProp.id === COLOR_PROP_ID) {
    const copy = { ...c };
    copy.colors = formatColors(copy.colors, copy.offers);
    return [...acc, copy];
  } else return [...acc, c];
}, []);
