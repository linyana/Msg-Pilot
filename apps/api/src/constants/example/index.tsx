import { StatusType } from '../types';

export const RecipientType: StatusType = {
  SELECTALL: {
    code: 1,
    displayName: 'All',
  },
  NEWRECIPIENTS: {
    code: 2,
    displayName: 'New recipients',
  },
  SENTRECIPIENTS: {
    code: 3,
    displayName: 'Sent recipients',
  },
};