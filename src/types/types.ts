export type ObjType = { [index: string]: string };

export type QueryType = {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  props?: { [index: string]: string[] };
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

export type SpecificationType = {
  id: number;
  title: string;
  value: string;
}

export type ProdCardType = {
  id: number;
  image: string;
  mainProp: MainPropType;
  colors: ColorType[];
  offers: OfferType[];
};

export type ProductType = ProdCardType & {
  category: CategoryType;
  content: string;
  specifications: SpecificationType[];
};

export type BreadCrumbType = {
  id: number;
  title: string;
  link?: string;
};

export type ProdStateType = {
  curOfferId: number | null;
  curColorId: number | null;
  curPrice: number | null;
  curTitle: string | null;
};

export type TabType = {
  id: number;
  title: string;
};

export type CartProdType = {
  qty: number;
  image: string;
  color: ColorType;
  offer: OfferType;
  mainProp: MainPropType;
};
