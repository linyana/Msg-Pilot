import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLogDto } from './create-user-log.dto';

export class UpdateUserLogDto extends PartialType(CreateUserLogDto) {}
