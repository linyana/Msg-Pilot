export interface IMetaType {
  message: string;
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
  };
}

export interface Imsg-pilotPaginationType {
    current: number;
    limit: number;
    offset: number;
    total_count: number;
}
