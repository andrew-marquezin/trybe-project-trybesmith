type ServiceResponseErrorType = 
'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNPROCESSABLE_CONTENT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string },
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;

type Data = {
  username: string,
  productIds?: number[],
};

export type UserResponse = {
  status: string,
  data: Data[],
};