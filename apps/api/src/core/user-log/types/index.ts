import { JsonValue } from '@prisma/client/runtime/library';

export type IUserLogType = {
  module: number;
  actions_type: number;
  feature: string;
  user_id: number;
  merchant_id: number;
  from: {
    [key: string]: string | number | JsonValue;
  };
  to: {
    [key: string]: string | number | JsonValue;
  };
};
