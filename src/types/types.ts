export type BreadCrumbType = {
  id: number;
  title: string;
  action?: () => void;
  link?: string;
};

export type CategoryType = {
  id: number;
  title: string;
  properties?: PropertyType[];
};

export type ColorType = {
  id: number;
  code: string;
  title: string;
  offer?: OfferType;
};

export type DeliveryType = {
  id: number;
  title: string;
  price: string;
};

export type ErrorType = {
  isError: boolean;
  errorTitle: string;
  errorMessage: string;
};

export type MainPropType = {
  id: number;
  code: string;
  title: string;
};

export type ObjType = { [index: string]: string };

export type OfferType = {
  id: number;
  title: string;
  price: number;
  value: string;
};

export type OrderFieldsErrorsType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  comment: string;
};

export type OrderFieldsValuesType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  deliveryTypeId: number;
  paymentTypeId: number;
  comment: string;
};

export type PaymentType = {
  id: number;
  title: string;
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

export type ProdCardType = {
  id: number;
  image: string;
  mainProp: MainPropType;
  colors: ColorType[];
  offers: OfferType[];
};

export type ProdStateType = {
  curOfferId: number | null;
  curColorId: number | null;
  curPrice: number | null;
  curTitle: string | null;
};

export type QueryType = {
  categoryId?: number;
  limit?: number,
  minPrice?: number;
  maxPrice?: number;
  props?: { [index: string]: string[] };
};

export type SpecificationType = {
  id: number;
  title: string;
  value: string;
}

export type ProductType = ProdCardType & {
  category: CategoryType;
  content: string;
  specifications: SpecificationType[];
};

export type TabType = {
  id: number;
  title: string;
};

export type CartItemType = {
  id: number;
  qty: number;
  image: string;
  color: ColorType;
  offer: OfferType;
  mainProp: MainPropType;
};

export type OrderInfoType = {
  orderId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  totalPrice: number;
  delivery: string;
  deliveryPrice: string;
  payment: string;
  comment: string;
  cartItems: CartItemType[];
};
