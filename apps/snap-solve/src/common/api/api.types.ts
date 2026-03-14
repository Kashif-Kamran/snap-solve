export interface ApiResponse<TData = unknown> {
  statusCode: number;
  message: string;
  data: TData;
}
