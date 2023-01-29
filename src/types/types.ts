export type ObjType = { [index: string]: string };

export type QueryType = {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
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
};

export type ColorType = {
  id: number;
  code: string;
  title: string;
  offer?: OfferType;
};

export type PropertyValueType = {
  value: string;
  count: number;
};

export type PropertyType = {
  id: number;
  title: string;
  code: string;
  values: PropertyValueType[];
};

export type CategoryType = {
  id: number;
  title: string;
  properties?: PropertyType[];
};

export type ProdCardType = {
  id: number;
  image: string;
  mainProp: MainPropType;
  colors: ColorType[];
  offers: OfferType[];
};
