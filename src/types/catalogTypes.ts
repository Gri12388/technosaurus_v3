export type ProdCardType = {
  id: number;
  image: string;
  mainProp: MainPropType;
  colors: ColorType[];
  offers: OfferType[];
};

export type ColorType = {
  id: number;
  code: string;
  title: string;
};

export type MainPropType = {
  id: number;
  code: string;
  title: string;
};

export type OfferType = {
  id: number;
  title: string;
  price: number;
  value: string;
}
