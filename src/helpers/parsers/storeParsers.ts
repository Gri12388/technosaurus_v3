import { CategoryType, ColorType } from '@/types/types';
import { parseColor } from '@/helpers/parsers/commonParsers';

export const parseCategory = (category: unknown) => {
  const temp: CategoryType = {
    id: -1,
    title: '',
  };

  if (typeof category === 'object' && category !== null) {
    if ('id' in category && typeof category.id === 'number') temp.id = category.id;
    else throw new Error('Field "category.id" is absent or is not type of "number"');

    if ('title' in category && typeof category.title === 'string') temp.title = category.title;
    else throw new Error('Field "category.title" is absent or is not type of "string"');
  } else throw new Error('Variable "category" is not an object');

  return temp;
};

export const parseCategories = (categories: unknown) => {
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
      temp = parseCategories(categoriesObj.items);
    } else throw new Error('Field "categoriesObj.items" is absent');
  } else throw new Error('Variable "categoriesObj" is not an object');

  return temp;
};

const parseColors = (colors: unknown) => {
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
      temp = parseColors(colorsObj.items);
    } else throw new Error('Field "value.items" is absent');
  } else throw new Error('Variable "colorsObj" is not an object');

  return temp;
};
