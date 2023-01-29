import { COLOR_PROP_ID } from '@/constants/constants';
import {
  ColorType,
  ObjType,
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

// export const formatPropsQuery = (array: { key: string, value: string }[]) => {
//   const obj: { [index: string]: string } = {};
//   array.forEach((item) => {
//     const key = `props[${item.key}][]`;
//     obj[key] = item.value;
//   });
//   return obj;
// };

// export const formatPropsQuery = (data: { [index: string]: string[] }) => {
//   const temp = Object.entries(data);
//   const obj: { [index: string]: string } = {};
//   temp.forEach((item) => {
//     const [key, value] = item;
//     const props: { [index: string]: string } = {};
//     const k = `props[${key}][]`;
//     value.forEach((v) => props[k] = v);
//   })

// }

// export const formatPropsQuery = (data: { [index: string]: string[] }) => {

//   const temp = Object.entries(data);
//   const obj: ObjType = {};
//   temp.forEach((item) => {
//     const [key, value] = item;
//     const k = `props[${key}][]`;

//     const props = value.reduce((acc: ObjType, v) => ({...acc, k: v}), {});
//   })
// }
