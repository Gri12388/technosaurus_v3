import { COLOR_PROP_ID } from '@/constants/constants';
import { ProdCardType } from '@/types/types';

export const initCurColorId = (card: ProdCardType) => {
  if (card.colors.length > 0) return card.colors[0].id;
  else return null;
};

export const initCurOfferId = (card: ProdCardType) => {
  if (card.offers.length > 0) return card.offers[0].id;
  else return null;
};

export const initCurTitle = (card: ProdCardType) => {
  if (card.mainProp.id === COLOR_PROP_ID) {
    if (card.colors.length > 0 && card.colors[0].offer) return card.colors[0].offer.title;
    else return null;
  } else if (card.offers.length > 0) return card.offers[0].title;
  else return null;
};

export const initCurPrice = (card: ProdCardType) => {
  if (card.mainProp.id === COLOR_PROP_ID) {
    if (card.colors.length > 0 && card.colors[0].offer) return card.colors[0].offer.price;
    else return null;
  } else if (card.offers.length > 0) return card.offers[0].price;
  else return null;
};

export const initMainProp = (card: ProdCardType) => {
  if (card.mainProp.id === COLOR_PROP_ID) return null;
  else return `${card.mainProp.title}:`;
};
