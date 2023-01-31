import { cloneDeep } from 'lodash';
import {
  defaultCategory,
  defaultColor,
  defaultMainProp,
  defaultOffer,
  defaultProperty,
  defaultPropertyValue,
} from '@/constants/constants';
import {
  ColorType,
  OfferType,
  PropertyType,
  PropertyValueType,
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
