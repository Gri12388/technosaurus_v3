import { cloneDeep } from 'lodash';
import {
  DeliveryType,
  OrderFieldsErrorsType,
  OrderInfoType,
  PaymentType,
} from '@/types/types';
import {
  defaultDelivery,
  defaultOrderFieldErrors,
  defaultOrderInfo,
  defaultPayment,
} from '@/constants/constants';
import { parseCartObj } from './commonParsers';

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
