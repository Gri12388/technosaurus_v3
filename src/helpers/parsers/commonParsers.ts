import { ColorType } from '@/types/types';

export const parseColor = (color: unknown) => {
  const temp: ColorType = {
    id: -1,
    code: '',
    title: '',
  };

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
