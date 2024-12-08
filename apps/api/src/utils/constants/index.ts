import { StatusType } from 'src/constants/types';

export const getDisplayNameByCode = (STATUS: StatusType, code: string | number): string => Object.values(STATUS)?.find((p) => p.code === +code)?.displayName || '';

export const getCodeByDisplayName = (STATUS: StatusType, displayName: string): string | number => Object.values(STATUS)?.find((p) => p.displayName === displayName)?.code || '';
