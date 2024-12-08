export type StatusItemType = {
  code: string | number;
  displayName: string;
};

export type StatusType = {
  [key: string]: StatusItemType;
};
