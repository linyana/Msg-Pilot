import { SetMetadata } from '@nestjs/common';

export const NoNeedConnection = () => SetMetadata('is_public', true);
