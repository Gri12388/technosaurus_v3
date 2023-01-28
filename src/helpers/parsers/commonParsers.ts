import {
  CategoryType,
  ColorType,
  PropertyType,
  PropertyValueType,
} from '@/types/types';

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

export const parsePropertyValue = (propertyValue: unknown) => {
  const temp: PropertyValueType = {
    value: '',
    count: -1,
  };

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
  const temp: PropertyType = {
    id: -1,
    title: '',
    code: '',
    values: [],
  };

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
  const temp: CategoryType = {
    id: -1,
    title: '',
  };

  if (typeof category === 'object' && category !== null) {
    if ('id' in category && typeof category.id === 'number') temp.id = category.id;
    else throw new Error('Field "category.id" is absent or is not type of "number"');

    if ('title' in category && typeof category.title === 'string') temp.title = category.title;
    else throw new Error('Field "category.title" is absent or is not type of "string"');

    if ('productProps' in category) temp.properties = parseProperties(category.productProps);
  } else throw new Error('Variable "category" is not an object');

  return temp;
};
