import {
  ColorType,
  MainPropType,
  OfferType,
  ProdCardType,
} from '@/types/catalogTypes';

const parsePagination = (value: unknown) => {
  let pages = 0;
  let total = 0;

  if (typeof value === 'object' && value !== null) {
    if ('pages' in value && typeof value.pages === 'number') {
      pages = value.pages;
    } else throw new Error('Field "pages" is absent or is not a number');

    if ('total' in value && typeof value.total === 'number') {
      total = value.total;
    } else throw new Error('Field "total" is absent or is not a number');
  } else throw new Error('Field "pagination" is not an object');

  return { pages, total };
};

const parseId = (value: unknown) => {
  let id = -1;

  if (typeof value === 'number') {
    id = value;
  } else throw new Error('Variable "value" is not type of "number"');

  return id;
};

const parseImage = (value: unknown) => {
  let image = '';

  if (typeof value === 'object' && value !== null) {
    if ('file' in value) {
      if (typeof value.file === 'object' && value.file !== null) {
        if ('url' in value.file && typeof value.file.url === 'string') {
          image = value.file.url;
        } else throw new Error('Field "value.file.url" is absent or is not type of "string"');
      } else throw new Error('Field "value.file" is not an object');
    } else throw new Error('Field "value.file" is absent');
  } else throw new Error('Variable "value" is not an object');

  return image;
};

const parseMainProp = (value: unknown) => {
  const mainProp: MainPropType = { id: -1, code: '', title: '' };

  if (typeof value === 'object' && value !== null) {
    if ('id' in value && typeof value.id === 'number') mainProp.id = value.id;
    else throw new Error('Field "value.id" is absent or is not type of "number"');

    if ('code' in value && typeof value.code === 'string') mainProp.code = value.code;
    else throw new Error('Field "value.code" is absent or is not type of "string"');

    if ('title' in value && typeof value.title === 'string') mainProp.title = value.title;
    else throw new Error('Field "value.title" is absent or is not type of "string"');
  } else throw new Error('Variable "value" is not an object');

  return mainProp;
};

const parseColor = (value: unknown) => {
  const color: ColorType = {
    id: -1,
    code: '',
    title: '',
  };

  if (typeof value === 'object' && value !== null) {
    if ('color' in value) {
      if (typeof value.color === 'object' && value.color !== null) {
        if ('id' in value.color && typeof value.color.id === 'number') color.id = value.color.id;
        else throw new Error('Field "value.color.id" is absent or is not type of "number"');

        if ('code' in value.color && typeof value.color.code === 'string') color.code = value.color.code;
        else throw new Error('Field "value.color.code" is absent or is not type of "string"');

        if ('title' in value.color && typeof value.color.title === 'string') color.title = value.color.title;
        else throw new Error('Field "value.color.title" is absent or is not type of "string"');
      } else throw Error('Field "value.color" is not an object');
    } else throw Error('Field "color" is absent');
  } else throw Error('Variable "value" is not an object');

  return color;
};

const parseColors = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.reduce((acc: ColorType[], item: unknown) => {
      try {
        const color = parseColor(item);
        return [...acc, color];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "value" is not an array');
};

const parseOffer = (value: unknown) => {
  const offer: OfferType = {
    id: -1,
    price: -1,
    title: '',
    value: '',
  };

  if (typeof value === 'object' && value !== null) {
    if ('id' in value && typeof value.id === 'number') {
      offer.id = value.id;
    } else throw new Error('Field "value.id" is absent or is not type of "number"');

    if ('title' in value && typeof value.title === 'string') {
      offer.title = value.title;
    } else throw new Error('Field "value.title" is absent or is not type of "string"');

    if ('price' in value && typeof value.price === 'number') {
      offer.price = value.price;
    } else throw new Error('Field "value.price" is absent or is not type of "number"');

    if ('propValues' in value) {
      if (Array.isArray(value.propValues) && value.propValues.length > 0) {
        if (typeof value.propValues[0] === 'object' && value.propValues[0] !== null) {
          if ('value' in value.propValues[0] && typeof value.propValues[0].value === 'string') {
            offer.value = value.propValues[0].value;
          } else throw new Error('Field "value.propValues[0].value" is absent or is not type of "string"');
        } else throw new Error('Field "value.propValues[0]" is not an object');
      } else throw new Error('Field "value.propValues is not an array or is an empty array"');
    } else throw new Error('Field "value.propValues" is absent');
  } else throw new Error('Variable "value" is not an object');

  return offer;
};

const parseOffers = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.reduce((acc: OfferType[], item: unknown) => {
      try {
        const offer = parseOffer(item);
        return [...acc, offer];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "value" is not an array');
};

const parseItem = (value: unknown) => {
  const card: ProdCardType = {
    id: -1,
    image: '',
    mainProp: { id: -1, code: '', title: '' },
    colors: [],
    offers: [],
  };

  if (typeof value === 'object' && value !== null) {
    if ('id' in value) card.id = parseId(value.id);

    if ('preview' in value) card.image = parseImage(value.preview);

    if ('mainProp' in value) card.mainProp = parseMainProp(value.mainProp);

    if ('colors' in value) card.colors = parseColors(value.colors);

    if ('offers' in value) card.offers = parseOffers(value.offers);
  } else throw new Error('Variable "value" is not an object');

  return card;
};

const parseItems = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.reduce((acc: ProdCardType[], item: unknown) => {
      try {
        const card = parseItem(item);
        return [...acc, card];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Field "items" is not an array');
};

export const parseProducts = (res: unknown) => {
  let cards: ProdCardType[] = [];
  let pages = 0;
  let total = 0;

  if (typeof res === 'object' && res !== null) {
    if ('pagination' in res) {
      const pagination = parsePagination(res.pagination);
      pages = pagination.pages;
      total = pagination.total;
    } else throw new Error('Response does not contain "pagination" field');

    if ('items' in res) {
      cards = parseItems(res.items);
    } else throw new Error('Response does not contain "items" field');
  } else throw new Error('Response is not an object');

  return { cards, pages, total };
};
