import { SetMetadata } from '@nestjs/common';

export const isPublic = () => SetMetadata('is_public', true);
