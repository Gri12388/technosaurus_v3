import axios from 'axios';
import { cartProdsPath, origin } from '@/constants/paths';
import { parseCartObj } from './parsers';

export const addProductRequest = async (params: {
  accessKey: string;
  curOfferId: number;
  curColorId: number;
  qty: number;
}) => {
  const {
    accessKey,
    curColorId,
    curOfferId,
    qty,
  } = params;
  const path = `${origin}${cartProdsPath}`;
  const config = { params: { userAccessKey: accessKey } };
  const data = { productOfferId: curOfferId, colorId: curColorId, quantity: qty };
  const res = await axios.post(path, data, config);
  return parseCartObj(res.data);
};
