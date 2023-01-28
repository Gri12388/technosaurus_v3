import {
  ColorType, MainPropType, OfferType, ProdCardType,
} from '@/types/types';
import { parseColor } from '@/helpers/parsers/commonParsers';

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

const parseId = (id: unknown) => {
  if (typeof id === 'number') return id;
  else throw new Error('Variable "id" is not type of "number"');
};

const parseImage = (image: unknown) => {
  if (typeof image === 'object' && image !== null) {
    if ('file' in image) {
      if (typeof image.file === 'object' && image.file !== null) {
        if ('url' in image.file && typeof image.file.url === 'string') return image.file.url;
        else throw new Error('Field "image.file.url" is absent or is not type of "string"');
      } else throw new Error('Field "image.file" is not an object');
    } else throw new Error('Field "image.file" is absent');
  } else throw new Error('Variable "image" is not an object');
};

const parseMainProp = (mainProp: unknown) => {
  const temp: MainPropType = { id: -1, code: '', title: '' };

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

const parseColorObj = (colorObj: unknown) => {
  if (typeof colorObj === 'object' && colorObj !== null) {
    if ('color' in colorObj) return parseColor(colorObj.color);
    else throw Error('Field "colorObj.color" is absent');
  } else throw Error('Variable "colorObj" is not an object');
};

const parseColors = (colors: unknown) => {
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

const parseOffer = (offer: unknown) => {
  const temp: OfferType = {
    id: -1,
    price: -1,
    title: '',
    value: '',
  };

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

const parseOffers = (offers: unknown) => {
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

const parseItem = (item: unknown) => {
  const temp: ProdCardType = {
    id: -1,
    image: '',
    mainProp: { id: -1, code: '', title: '' },
    colors: [],
    offers: [],
  };

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
