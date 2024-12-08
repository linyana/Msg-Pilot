import { PartialType } from '@nestjs/mapped-types';
import { CreateRedDto } from './create-red.dto';

export class UpdateRedDto extends PartialType(CreateRedDto) {}
