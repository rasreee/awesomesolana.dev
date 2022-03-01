export interface ErrorData {
  message: string;
}

export type ApiData<SuccessData> = SuccessData | ErrorData;

export const isApiError = (o: any): o is ErrorData => {
  return (
    typeof o === 'object' && 'message' in o && typeof o.message === 'string'
  );
};
