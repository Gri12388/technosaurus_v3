import { cloneDeep } from 'lodash';
import { DeliveryType } from '@/types/types';
import { defaultDelivery } from '@/constants/constants';

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
  } else throw new Error('Variable "offer" is not an object');

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
