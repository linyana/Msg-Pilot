import { GetUserLogsDto } from '../../dto/get-user-log.dto';

export const getUserLogSearchParams = (userLogDto: GetUserLogsDto, merchant_id: number) => ({
  orderBy: [{ [userLogDto.sort_by ?? 'created_at']: userLogDto.order_by ?? 'desc' }],
  where: {
    merchant_id,
  },
  include: {
    user: {
      select: {
        name: true,
        email: true,
      },
    },
  },
});
