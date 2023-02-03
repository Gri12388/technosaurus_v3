import { BAD_CONFIG, BAD_RESPONSE, NO_RESPONSE } from '@/constants/constants';
import { AxiosError } from 'axios';

export const handleAxiosError = (err: AxiosError) => {
  if (err.response) {
    console.error(err.response.data);
    return BAD_RESPONSE;
  } else if (err.request) {
    console.error(err.request);
    return NO_RESPONSE;
  } else {
    console.log('Error', err.message);
    return BAD_CONFIG;
  }
};
