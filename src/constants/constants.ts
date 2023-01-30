import { TabType } from '@/types/types';

export const COLOR_PROP_ID = 7;

export const TABS: TabType[] = [
  { id: 0, title: 'Описание' },
  { id: 1, title: 'Характеристики' },
];

export const defaultProdState = {
  curOfferId: null,
  curColorId: null,
  curPrice: null,
  curTitle: null,
};
