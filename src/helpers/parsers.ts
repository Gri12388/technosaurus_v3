import { ProdCardType } from '@/types/catalogTypes';

export const parseProducts = (res: unknown) => {
  const cards: ProdCardType[] = [];
  let pages = 0;
  let total = 0;

  if (typeof res === 'object' && res !== null) {
    if ('pagination' in res) {
      if (typeof res.pagination === 'object' && res.pagination !== null) {
        if ('pages' in res.pagination && typeof res.pagination.pages === 'number') {
          pages = res.pagination.pages;
        } else throw new Error('Field "pages" is absent or is not a number');

        if ('total' in res.pagination && typeof res.pagination.total === 'number') {
          total = res.pagination.total;
        } else throw new Error('Field "total" is absent or is not a number');
      } else throw new Error('Field "pagination" is not an object');
    } else throw new Error('Response does not contain "pagination" field');

    if ('items' in res) {
      if (Array.isArray(res.items)) {
        res.items.forEach((item: unknown) => {
          const card: ProdCardType = {
            id: -1,
            title: '',
            price: -1,
            image: '',
          };

          if (typeof item === 'object' && item !== null) {
            if ('id' in item && typeof item.id === 'number') card.id = item.id;
            else return;

            if ('title' in item && typeof item.title === 'string') card.title = item.title;
            else return;

            if ('price' in item && typeof item.price === 'number') card.price = item.price;
            else return;

            if ('preview' in item
              && typeof item.preview === 'object'
              && item.preview !== null
              && 'file' in item.preview
              && typeof item.preview.file === 'object'
              && item.preview.file !== null
              && 'url' in item.preview.file
              && typeof item.preview.file.url === 'string'
            ) card.image = item.preview.file.url;
          } else return;

          cards.push(card);
        });
        return { cards, pages, total };
      } else throw new Error('Field "items" is not an array');
    } else throw new Error('Response does not contain "items" field');
  } else throw new Error('Response is not an object');
};
