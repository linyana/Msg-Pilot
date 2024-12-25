export interface IMetaType {
  message: string;
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
  };
}
