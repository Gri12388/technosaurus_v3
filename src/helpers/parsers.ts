import { cloneDeep } from 'lodash';
import {
  defaultCartItem,
  defaultCategory,
  defaultColor,
  defaultDelivery,
  defaultMainProp,
  defaultOffer,
  defaultOrderFieldErrors,
  defaultOrderInfo,
  defaultPayment,
  defaultProdCard,
  defaultProduct,
  defaultProperty,
  defaultPropertyValue,
  defaultSpec,
} from '@/constants/constants';
import {
  CartItemType,
  CategoryType,
  ColorType,
  DeliveryType,
  OfferType,
  OrderFieldsErrorsType,
  OrderInfoType,
  PaymentType,
  ProdCardType,
  PropertyType,
  PropertyValueType,
  SpecificationType,
} from '@/types/types';

export const parseColor = (color: unknown) => {
  const temp = cloneDeep(defaultColor);

  if (typeof color === 'object' && color !== null) {
    if ('id' in color && typeof color.id === 'number') temp.id = color.id;
    else throw new Error('Field "color.id" is absent or is not type of "number"');

    if ('code' in color && typeof color.code === 'string') temp.code = color.code;
    else throw new Error('Field "color.code" is absent or is not type of "string"');

    if ('title' in color && typeof color.title === 'string') temp.title = color.title;
    else throw new Error('Field "color.title" is absent or is not type of "string"');
  } else throw Error('Variable "color" is not an object');

  return temp;
};

export const parsePropertyValue = (propertyValue: unknown) => {
  const temp = cloneDeep(defaultPropertyValue);

  if (typeof propertyValue === 'object' && propertyValue !== null) {
    if ('value' in propertyValue && typeof propertyValue.value === 'string') {
      temp.value = propertyValue.value;
    } else throw new Error('Field "propertyValue.value" is absent or is not type of "string"');

    if ('productsCount' in propertyValue && typeof propertyValue.productsCount === 'number') {
      temp.count = propertyValue.productsCount;
    } else throw new Error('Field "propertyValue.count" is absent or is not type of "number"');
  } else throw new Error('Variable "propertyValue" is not an object');

  return temp;
};

export const parsePropertyValues = (propertyValues: unknown) => {
  if (Array.isArray(propertyValues)) {
    return propertyValues.reduce((acc: PropertyValueType[], item: unknown) => {
      try {
        const propertyValue = parsePropertyValue(item);
        return [...acc, propertyValue];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "propertyValues" is not an array');
};

export const parseProperty = (property: unknown) => {
  const temp = cloneDeep(defaultProperty);

  if (typeof property === 'object' && property !== null) {
    if ('id' in property && typeof property.id === 'number') {
      temp.id = property.id;
    } else throw new Error('Field "property.id" is absent or is not type of "number"');

    if ('title' in property && typeof property.title === 'string') {
      temp.title = property.title;
    } else throw new Error('Field "property.title" is absent or is not type of "string"');

    if ('code' in property && typeof property.code === 'string') {
      temp.code = property.code;
    } else throw new Error('Field "property.code" is absent or is not type of "string"');

    if ('availableValues' in property) {
      temp.values = parsePropertyValues(property.availableValues);
    } else throw new Error('Field "property.availableValues" is absent');
  } else throw new Error('Variable "property" is not an object');

  return temp;
};

export const parseProperties = (properties: unknown) => {
  if (Array.isArray(properties)) {
    return properties.reduce((acc: PropertyType[], item: unknown) => {
      try {
        const property = parseProperty(item);
        return [...acc, property];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "properties" is not an array');
};

export const parseCategory = (category: unknown) => {
  const temp = cloneDeep(defaultCategory);

  if (typeof category === 'object' && category !== null) {
    if ('id' in category && typeof category.id === 'number') temp.id = category.id;
    else throw new Error('Field "category.id" is absent or is not type of "number"');

    if ('title' in category && typeof category.title === 'string') temp.title = category.title;
    else throw new Error('Field "category.title" is absent or is not type of "string"');

    if ('productProps' in category) temp.properties = parseProperties(category.productProps);
  } else throw new Error('Variable "category" is not an object');

  return temp;
};

export const parseId = (id: unknown) => {
  if (typeof id === 'number') return id;
  else throw new Error('Variable "id" is not type of "number"');
};

export const parseImage = (image: unknown) => {
  if (typeof image === 'object' && image !== null) {
    if ('file' in image) {
      if (typeof image.file === 'object' && image.file !== null) {
        if ('url' in image.file && typeof image.file.url === 'string') return image.file.url;
        else throw new Error('Field "image.file.url" is absent or is not type of "string"');
      } else throw new Error('Field "image.file" is not an object');
    } else throw new Error('Field "image.file" is absent');
  } else throw new Error('Variable "image" is not an object');
};

export const parseMainProp = (mainProp: unknown) => {
  const temp = cloneDeep(defaultMainProp);

  if (typeof mainProp === 'object' && mainProp !== null) {
    if ('id' in mainProp && typeof mainProp.id === 'number') temp.id = mainProp.id;
    else throw new Error('Field "mainProp.id" is absent or is not type of "number"');

    if ('code' in mainProp && typeof mainProp.code === 'string') temp.code = mainProp.code;
    else throw new Error('Field "mainProp.code" is absent or is not type of "string"');

    if ('title' in mainProp && typeof mainProp.title === 'string') temp.title = mainProp.title;
    else throw new Error('Field "mainProp.title" is absent or is not type of "string"');
  } else throw new Error('Variable "mainProp" is not an object');

  return temp;
};

export const parseColorObj = (colorObj: unknown) => {
  if (typeof colorObj === 'object' && colorObj !== null) {
    if ('color' in colorObj) return parseColor(colorObj.color);
    else throw Error('Field "colorObj.color" is absent');
  } else throw Error('Variable "colorObj" is not an object');
};

export const parseColors = (colors: unknown) => {
  if (Array.isArray(colors)) {
    return colors.reduce((acc: ColorType[], item: unknown) => {
      try {
        const color = parseColorObj(item);
        return [...acc, color];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "colors" is not an array');
};

export const parseOffer = (offer: unknown) => {
  const temp = cloneDeep(defaultOffer);

  if (typeof offer === 'object' && offer !== null) {
    if ('id' in offer && typeof offer.id === 'number') {
      temp.id = offer.id;
    } else throw new Error('Field "offer.id" is absent or is not type of "number"');

    if ('title' in offer && typeof offer.title === 'string') {
      temp.title = offer.title;
    } else throw new Error('Field "offer.title" is absent or is not type of "string"');

    if ('price' in offer && typeof offer.price === 'number') {
      temp.price = offer.price;
    } else throw new Error('Field "offer.price" is absent or is not type of "number"');

    if ('propValues' in offer) {
      if (Array.isArray(offer.propValues) && offer.propValues.length > 0) {
        if (typeof offer.propValues[0] === 'object' && offer.propValues[0] !== null) {
          if ('value' in offer.propValues[0] && typeof offer.propValues[0].value === 'string') {
            temp.value = offer.propValues[0].value;
          } else throw new Error('Field "value.propValues[0].value" is absent or is not type of "string"');
        } else throw new Error('Field "offer.propValues[0]" is not an object');
      } else throw new Error('Field "offer.propValues is not an array or is an empty array"');
    } else throw new Error('Field "offer.propValues" is absent');
  } else throw new Error('Variable "offer" is not an object');

  return temp;
};

export const parseOffers = (offers: unknown) => {
  if (Array.isArray(offers)) {
    return offers.reduce((acc: OfferType[], item: unknown) => {
      try {
        const offer = parseOffer(item);
        return [...acc, offer];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "offers" is not an array');
};

export const parseAccessKeyObj = (accessKeyObj: unknown) => {
  if (typeof accessKeyObj === 'object' && accessKeyObj !== null) {
    if ('accessKey' in accessKeyObj && typeof accessKeyObj.accessKey === 'string') {
      return accessKeyObj.accessKey;
    } else throw new Error('Field "accessKeyObj.accessKeyObj" is absent or is not type of "string"');
  } else throw new Error('Variable "accessKeyObj" is not an object');
};

const parseCartItem = (cartItem: unknown) => {
  const temp = cloneDeep(defaultCartItem);

  if (typeof cartItem === 'object' && cartItem !== null) {
    if ('id' in cartItem && typeof cartItem.id === 'number') {
      temp.id = cartItem.id;
    } else throw new Error('Field "cartItem.id" is absent or is not type of "number"');

    if ('quantity' in cartItem && typeof cartItem.quantity === 'number') {
      temp.qty = cartItem.quantity;
    } else throw new Error('Field "cartItem.quantity" is absent or is not type of "number"');

    if ('color' in cartItem) {
      if (typeof cartItem.color === 'object' && cartItem.color !== null) {
        if ('color' in cartItem.color) {
          temp.color = parseColor(cartItem.color.color);
        } else throw new Error('Field "cartItem.color.color" is absent');
      } else throw new Error('Field "cartItem.color" is not an object');
    } else throw new Error('Field "cartItem.color" is absent');

    if ('productOffer' in cartItem) {
      if (typeof cartItem.productOffer === 'object' && cartItem.productOffer !== null) {
        if ('product' in cartItem.productOffer) {
          if (typeof cartItem.productOffer.product === 'object' && cartItem.productOffer.product !== null) {
            if ('preview' in cartItem.productOffer.product) {
              temp.image = parseImage(cartItem.productOffer.product.preview);
            } else throw new Error('Field "cartItem.productOffer.product.preview" is absent');

            if ('mainProp' in cartItem.productOffer.product) {
              temp.mainProp = parseMainProp(cartItem.productOffer.product.mainProp);
            } else throw new Error('Field "cartItem.productOffer.product.mainProp" is absent');

            temp.offer = parseOffer(cartItem.productOffer);
          } else throw new Error('Field "cartItem.productOffer.product" is not an object');
        } else throw new Error('Field "cartItem.productOffer.product" is absent');
      } else throw new Error('Field "cartItem.productOffer" is not an object');
    } else throw new Error('Field "cartItem.productOffer" is absent');
  } else throw new Error('Variable "cartItem" is not an object');

  return temp;
};

export const parseCartItems = (cartItems: unknown) => {
  if (Array.isArray(cartItems)) {
    return cartItems.reduce((acc: CartItemType[], item: unknown) => {
      try {
        const cartItem = parseCartItem(item);
        return [...acc, cartItem];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "cartItem" is not an array');
};

export const parseCartObj = (cartObj: unknown) => {
  let accessKey = '';
  let cartItems: CartItemType[] = [];

  if (typeof cartObj === 'object' && cartObj !== null) {
    if ('user' in cartObj) {
      accessKey = parseAccessKeyObj(cartObj.user);
    } else throw new Error('Field "cartObj.user" is absent');

    if ('items' in cartObj) {
      cartItems = parseCartItems(cartObj.items);
    } else throw new Error('Field "cartObj.items" is absent');
  } else throw new Error('Variable "cartObj" is not an object');

  return { accessKey, cartItems };
};

const parsePagination = (pagination: unknown) => {
  let pages = 0;
  let total = 0;

  if (typeof pagination === 'object' && pagination !== null) {
    if ('pages' in pagination && typeof pagination.pages === 'number') {
      pages = pagination.pages;
    } else throw new Error('Field "pagination.pages" is absent or is not type of "number"');

    if ('total' in pagination && typeof pagination.total === 'number') {
      total = pagination.total;
    } else throw new Error('Field "pagination.total" is absent or is not typeof "number"');
  } else throw new Error('Variable "pagination" is not an object');

  return { pages, total };
};

const parseItem = (item: unknown) => {
  const temp = cloneDeep(defaultProdCard);

  if (typeof item === 'object' && item !== null) {
    if ('id' in item) temp.id = parseId(item.id);

    if ('preview' in item) temp.image = parseImage(item.preview);

    if ('mainProp' in item) temp.mainProp = parseMainProp(item.mainProp);

    if ('colors' in item) temp.colors = parseColors(item.colors);

    if ('offers' in item) temp.offers = parseOffers(item.offers);
  } else throw new Error('Variable "item" is not an object');

  return temp;
};

const parseItems = (items: unknown) => {
  if (Array.isArray(items)) {
    return items.reduce((acc: ProdCardType[], item: unknown) => {
      try {
        const card = parseItem(item);
        return [...acc, card];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "items" is not an array');
};

export const parseProducts = (products: unknown) => {
  let cards: ProdCardType[] = [];
  let pages = 0;
  let total = 0;

  if (typeof products === 'object' && products !== null) {
    if ('pagination' in products) {
      const pagination = parsePagination(products.pagination);
      pages = pagination.pages;
      total = pagination.total;
    } else throw new Error('Field "products.pagination" is absent');

    if ('items' in products) {
      cards = parseItems(products.items);
    } else throw new Error('Field "value.items" is absent');
  } else throw new Error('Variable "products" is not an object');

  return { cards, pages, total };
};

export const parseDelivery = (delivery: unknown) => {
  const temp = cloneDeep(defaultDelivery);

  if (typeof delivery === 'object' && delivery !== null) {
    if ('id' in delivery && typeof delivery.id === 'number') {
      temp.id = delivery.id;
    } else throw new Error('Field "delivery.id" is absent or is not type of "number"');

    if ('price' in delivery && typeof delivery.price === 'string') {
      temp.price = delivery.price;
    } else throw new Error('Field "delivery.price" is absent or is not type of "string"');

    if ('title' in delivery && typeof delivery.title === 'string') {
      temp.title = delivery.title;
    } else throw new Error('Field "delivery.title" is absent or is not type of "string"');
  } else throw new Error('Variable "delivery" is not an object');

  return temp;
};

export const parseDeliveries = (deliveries: unknown) => {
  if (Array.isArray(deliveries)) {
    return deliveries.reduce((acc: DeliveryType[], item: unknown) => {
      try {
        const delivery = parseDelivery(item);
        return [...acc, delivery];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "deliveries" is not an array');
};

export const parsePayment = (payment: unknown) => {
  const temp = cloneDeep(defaultPayment);

  if (typeof payment === 'object' && payment !== null) {
    if ('id' in payment && typeof payment.id === 'number') {
      temp.id = payment.id;
    } else throw new Error('Field "payment.id" is absent or is not type of "number"');

    if ('title' in payment && typeof payment.title === 'string') {
      temp.title = payment.title;
    } else throw new Error('Field "payment.title" is absent or is not type of "string"');
  } else throw new Error('Variable "payment" is not an object');

  return temp;
};

export const parsePayments = (payments: unknown) => {
  if (Array.isArray(payments)) {
    return payments.reduce((acc: PaymentType[], item: unknown) => {
      try {
        const payment = parsePayment(item);
        return [...acc, payment];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "payments" is not an array');
};

export const parseOrderError = (orderError: unknown) => {
  const temp: OrderFieldsErrorsType = cloneDeep(defaultOrderFieldErrors);

  if (typeof orderError === 'object' && orderError !== null) {
    if ('error' in orderError) {
      if (typeof orderError.error === 'object' && orderError.error !== null) {
        if ('request' in orderError.error) {
          if (typeof orderError.error.request === 'object' && orderError.error.request !== null) {
            if ('name' in orderError.error.request && typeof orderError.error.request.name === 'string') {
              temp.name = orderError.error.request.name;
            }

            if ('address' in orderError.error.request && typeof orderError.error.request.address === 'string') {
              temp.address = orderError.error.request.address;
            }

            if ('phone' in orderError.error.request && typeof orderError.error.request.phone === 'string') {
              temp.phone = orderError.error.request.phone;
            }

            if ('email' in orderError.error.request && typeof orderError.error.request.email === 'string') {
              temp.email = orderError.error.request.email;
            }

            if ('comment' in orderError.error.request && typeof orderError.error.request.comment === 'string') {
              temp.comment = orderError.error.request.comment;
            }
          } else throw new Error('Field "orderError.error.request" is not an object');
        } else throw new Error('Field "orderError.error.request" is absent');
      } else throw new Error('Field "orderError.error" is not an object');
    } else throw new Error('Field "orderError.error" is absent');
  } else throw new Error('Variable "orderError" is not an object');

  return temp;
};

export const parseOrderObj = (orderObj: unknown) => {
  const temp: OrderInfoType = cloneDeep(defaultOrderInfo);

  if (typeof orderObj === 'object' && orderObj !== null) {
    if ('id' in orderObj && typeof orderObj.id === 'number') {
      temp.orderId = orderObj.id;
    } else throw new Error('Field "orderObj.id" is absent or is not type of "number"');

    if ('name' in orderObj && typeof orderObj.name === 'string') {
      temp.name = orderObj.name;
    } else throw new Error('Field "orderObj.name" is absent or is not type of "string"');

    if ('address' in orderObj && typeof orderObj.address === 'string') {
      temp.address = orderObj.address;
    } else throw new Error('Field "orderObj.address" is absent or is not type of "string"');

    if ('phone' in orderObj && typeof orderObj.phone === 'string') {
      temp.phone = orderObj.phone;
    } else throw new Error('Field "orderObj.phone" is absent or is not type of "string"');

    if ('email' in orderObj && typeof orderObj.email === 'string') {
      temp.email = orderObj.email;
    } else throw new Error('Field "orderObj.email" is absent or is not type of "string"');

    if ('totalPrice' in orderObj && typeof orderObj.totalPrice === 'number') {
      temp.totalPrice = orderObj.totalPrice;
    } else throw new Error('Field "orderObj.totalPrice" is absent or is not type of "number"');

    if ('paymentType' in orderObj && typeof orderObj.paymentType === 'string') {
      temp.payment = orderObj.paymentType;
    } else throw new Error('Field "orderObj.paymentType" is absent or is not type of "string"');

    if ('comment' in orderObj && typeof orderObj.comment === 'string') {
      temp.comment = orderObj.comment;
    }

    if ('deliveryType' in orderObj) {
      if (typeof orderObj.deliveryType === 'object' && orderObj.deliveryType !== null) {
        if ('title' in orderObj.deliveryType && typeof orderObj.deliveryType.title === 'string') {
          temp.delivery = orderObj.deliveryType.title;
        } else throw new Error('Field "orderObj.deliveryType.title" is absent or is not type of "string"');

        if ('price' in orderObj.deliveryType && typeof orderObj.deliveryType.price === 'string') {
          temp.deliveryPrice = orderObj.deliveryType.price;
        } else throw new Error('Field "orderObj.deliveryType.price" is absent or is not type of "string"');
      } else throw new Error('Field "orderObj.deliveryType" is not an object');
    } else throw new Error('Field "orderObj.deliveryType" is absent');

    if ('basket' in orderObj) {
      if (typeof orderObj.basket === 'object' && orderObj.basket !== null) {
        temp.cartItems = parseCartObj(orderObj.basket).cartItems;
      } else throw new Error('Field "orderObj.basket" is not an object');
    } else throw new Error('Field "orderObj.basket" is absent');
  } else throw new Error('Variable "orderObj" is not an object');

  return temp;
};

export const parseContent = (content: unknown) => {
  if (typeof content === 'string') return content;
  else throw new Error('Variable "content" is not typeof "string"');
};

export const parseSpecification = (spec: unknown) => {
  const temp = cloneDeep(defaultSpec);

  if (typeof spec === 'object' && spec !== null) {
    if ('id' in spec && typeof spec.id === 'number') {
      temp.id = spec.id;
    } else throw new Error('Field "spec.id" is absent or is not type of "number"');

    if ('title' in spec && typeof spec.title === 'string') {
      temp.title = spec.title;
    } else throw new Error('Field "spec.title" is absent or is not type of "string"');

    if ('value' in spec && typeof spec.value === 'string') {
      temp.value = spec.value;
    } else throw new Error('Field "spec.value" is absent or is not type of "string"');
  } else throw new Error('Variable "spec" is not an object');

  return temp;
};

export const parseSpecifications = (specs: unknown) => {
  if (Array.isArray(specs)) {
    return specs.reduce((acc: SpecificationType[], item: unknown) => {
      try {
        const spec = parseSpecification(item);
        return [...acc, spec];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "specs" is not an array');
};

export const parseProductObj = (product: unknown) => {
  const temp = cloneDeep(defaultProduct);

  if (typeof product === 'object' && product !== null) {
    if ('id' in product) temp.id = parseId(product.id);

    if ('preview' in product) temp.image = parseImage(product.preview);

    if ('mainProp' in product) temp.mainProp = parseMainProp(product.mainProp);

    if ('colors' in product) temp.colors = parseColors(product.colors);

    if ('offers' in product) temp.offers = parseOffers(product.offers);

    if ('specifications' in product) temp.specifications = parseSpecifications(product.specifications);

    if ('category' in product) temp.category = parseCategory(product.category);

    if ('content' in product) temp.content = parseContent(product.content);
  } else throw new Error('Variable "product" is not an object');

  return temp;
};

export const parseCategoryItems = (categories: unknown) => {
  if (Array.isArray(categories)) {
    return categories.reduce((acc: CategoryType[], item: unknown) => {
      try {
        const card = parseCategory(item);
        return [...acc, card];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "categories" is not an array');
};

export const parseCategoriesObj = (categoriesObj: unknown) => {
  let temp: CategoryType[] = [];

  if (typeof categoriesObj === 'object' && categoriesObj !== null) {
    if ('items' in categoriesObj) {
      temp = parseCategoryItems(categoriesObj.items);
    } else throw new Error('Field "categoriesObj.items" is absent');
  } else throw new Error('Variable "categoriesObj" is not an object');

  return temp;
};

const parseColorItems = (colors: unknown) => {
  if (Array.isArray(colors)) {
    return colors.reduce((acc: ColorType[], item: unknown) => {
      try {
        const color = parseColor(item);
        return [...acc, color];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "colors" is not an array');
};

export const parseColorsObj = (colorsObj: unknown) => {
  let temp: ColorType[] = [];

  if (typeof colorsObj === 'object' && colorsObj !== null) {
    if ('items' in colorsObj) {
      temp = parseColorItems(colorsObj.items);
    } else throw new Error('Field "value.items" is absent');
  } else throw new Error('Variable "colorsObj" is not an object');

  return temp;
};
