export class CreateRedisDto {
  key: string;
  value: any;
  ttl?: number;
}
