import { ProdCardType } from '@/types/catalogTypes';

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

const parseItem = (value: unknown) => {
  const card: ProdCardType = {
    id: -1,
    image: '',
  };

  if (typeof value === 'object' && value !== null) {
    if ('id' in value && typeof value.id === 'number') card.id = value.id;
    else return null;

    if ('preview' in value
      && typeof value.preview === 'object'
      && value.preview !== null
      && 'file' in value.preview
      && typeof value.preview.file === 'object'
      && value.preview.file !== null
      && 'url' in value.preview.file
      && typeof value.preview.file.url === 'string'
    ) card.image = value.preview.file.url;
  } else return null;

  return card;
};

const parseItems = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.reduce((acc: ProdCardType[], item: unknown) => {
      const card = parseItem(item);
      if (card) return [...acc, card];
      else return acc;
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
