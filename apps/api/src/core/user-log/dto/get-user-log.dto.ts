import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  limit: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  offset: string;

  @ApiPropertyOptional({ required: true, default: 'desc' })
  @IsString()
  @IsOptional()
  order_by: string;

  @ApiPropertyOptional({ required: true, default: 'updated_at' })
  @IsString()
  @IsOptional()
  sort_by: string;
}

export class GetUserLogDto {}

export class GetUserLogsDto extends IntersectionType(SearchDto, GetUserLogDto) {}
