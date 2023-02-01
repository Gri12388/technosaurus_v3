import { cloneDeep } from 'lodash';
import {
  BreadCrumbType,
  CartItemType,
  CategoryType,
  ColorType,
  MainPropType,
  OfferType,
  OrderFieldsValuesType,
  ProdCardType,
  ProductType,
  PropertyType,
  PropertyValueType,
  SpecificationType,
  TabType,
} from '@/types/types';

export const COLOR_PROP_ID = 7;

export const TABS: TabType[] = [
  { id: 0, title: 'Описание' },
  { id: 1, title: 'Характеристики' },
];

export const CART_BREADCRUMBS: BreadCrumbType[] = [
  { id: 0, title: 'Каталог', link: 'catalog' },
  { id: 1, title: 'Корзина' },
];

export const ORDER_BREADCRUMBS: BreadCrumbType[] = [
  { id: 0, title: 'Каталог', link: 'catalog' },
  { id: 1, title: 'Корзина', link: 'cart' },
  { id: 1, title: 'Оформление заказа' },
];

export const LOREM = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet odit cumque quam quas. Similique debitis commodi deserunt illo unde expedita tenetur quod, perspiciatis esse at officiis dolorum maxime praesentium libero sapiente modi omnis, deleniti quaerat aliquam ut aspernatur. Odio aspernatur molestiae aliquam ullam esse. Ab ad ratione mollitia iusto architecto doloribus distinctio fuga, dicta quasi repellat qui ut rerum? Minus, deserunt quo. Sit odio autem, culpa explicabo assumenda aliquam blanditiis unde expedita porro veritatis cumque obcaecati iste facilis quibusdam harum nobis dolore. Sit voluptas alias reiciendis beatae laboriosam illum dolore animi quas veniam nostrum, ducimus itaque consequatur sunt velit! Corporis veritatis doloribus necessitatibus dolorem a! Porro, aspernatur sapiente veritatis molestiae facere officia assumenda! Recusandae veritatis voluptate eos libero, pariatur ratione numquam iure quae nam repellendus omnis dolore sint ipsum aperiam ut ullam officiis non amet dolores? Provident, neque adipisci sunt tempora debitis asperiores dolorum fugit! Vel error omnis rem mollitia pariatur praesentium, provident tempore sint. Sapiente, officiis fugit aspernatur porro dolore laboriosam quo esse! Nisi cupiditate officiis quis, delectus eos mollitia dolore? Veniam exercitationem ipsam quisquam eos, eveniet illum libero omnis. Molestias, libero eum. Quia esse, beatae repellat dicta, iste pariatur magni commodi ut saepe corporis veniam voluptates culpa quaerat voluptatum, minima fugiat tenetur! Quia optio, asperiores iure vitae aliquam quaerat quasi incidunt consequatur dolore facilis sit tempora quidem ad facere maiores molestias. Consequatur incidunt repudiandae veniam quidem pariatur, corrupti eius? Saepe dolores ratione perferendis, doloremque temporibus ex asperiores! Reiciendis libero quo, at cupiditate rerum deleniti ducimus neque similique saepe dignissimos mollitia rem ab nobis? Commodi quo, inventore voluptatum, quibusdam sequi voluptatem, maxime incidunt beatae totam omnis eos? Odit doloribus at ab minus sequi saepe iusto, quibusdam exercitationem ipsum ex repellat placeat rem, animi magni molestiae nobis quae fugit, necessitatibus iste aperiam in perferendis enim aut ratione! Quam at odit, hic eos non numquam ad modi officia corporis, commodi omnis quae, harum tempore magni et maxime dolore earum totam illum. Officia soluta consequatur ipsa culpa minus saepe dolores ducimus ipsam totam cum illum, aliquam sequi adipisci explicabo repellat! Accusamus quam veritatis sed vero ex eos perspiciatis! Quidem iusto debitis aspernatur deleniti alias nihil eaque, architecto libero quod tempore cum dignissimos sint vero culpa ipsum sunt neque ab laborum eveniet reiciendis fugit officiis, accusamus fugiat dolorem? Repudiandae facere, possimus quibusdam sunt dolore amet magnam ipsum, dolorum repellat, porro aliquam. Et saepe totam aperiam. Hic quia ipsa sapiente, nisi, sint, alias minus voluptatibus optio ipsum esse harum. Similique magni error tempora at laudantium assumenda aperiam magnam deleniti animi fuga quos debitis perspiciatis voluptates ut facere, sit a omnis. Minus alias maxime ad optio saepe quaerat, sed, obcaecati dolorem est quia amet aperiam maiores architecto animi. Autem iure incidunt harum impedit voluptatum recusandae provident aspernatur eveniet consequuntur, exercitationem repellendus, maxime totam eligendi rem optio laborum atque esse voluptatibus. Officia, commodi possimus sequi sint natus voluptas earum, deserunt nihil ullam neque nam! Magni dignissimos assumenda architecto fuga minus reprehenderit hic laborum obcaecati consectetur consequatur minima, at suscipit aliquid consequuntur vel sed eaque iure veritatis!';

export const defaultCategory: CategoryType = { id: -1, title: '' };

export const defaultColor: ColorType = { id: -1, code: '', title: '' };

export const defaultMainProp: MainPropType = { id: -1, code: '', title: '' };

export const defaultOffer: OfferType = {
  id: -1,
  price: -1,
  title: '',
  value: '',
};

export const defaultOrderFieldsValues: OrderFieldsValuesType = {
  name: '',
  address: '',
  phone: '',
  email: '',
  deliveryTypeId: -1,
  paymentTypeId: -1,
  comment: '',
};

export const defaultProdState = {
  curOfferId: null,
  curColorId: null,
  curPrice: null,
  curTitle: null,
};

export const defaultProperty: PropertyType = {
  id: -1,
  title: '',
  code: '',
  values: [],
};

export const defaultPropertyValue: PropertyValueType = { value: '', count: -1 };

export const defaultSpec: SpecificationType = { id: -1, title: '', value: '' };

export const defaultProdCard: ProdCardType = {
  id: -1,
  image: '',
  mainProp: cloneDeep(defaultMainProp),
  colors: [],
  offers: [],
};

export const defaultProduct: ProductType = {
  id: -1,
  image: '',
  content: '',
  colors: [],
  offers: [],
  specifications: [],
  category: cloneDeep(defaultCategory),
  mainProp: cloneDeep(defaultMainProp),
};

export const defaultCartItem: CartItemType = {
  id: 0,
  qty: 0,
  image: '',
  mainProp: cloneDeep(defaultMainProp),
  color: cloneDeep(defaultColor),
  offer: cloneDeep(defaultOffer),
};
