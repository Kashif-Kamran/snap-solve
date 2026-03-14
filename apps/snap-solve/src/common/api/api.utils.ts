import { ApiResponse } from './api.types';

export const responseHandler = <TData>(
  statusCode: number,
  message: string,
  data: TData,
): ApiResponse<TData> => {
  return {
    statusCode,
    message,
    data,
  };
};
