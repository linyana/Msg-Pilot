import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserLogType } from './user-log.types';
import { getUserLogSearchParams } from './utils';
import { GetUserLogsDto } from './dto/get-user-log.dto';

@Injectable()
export class UserLogService {
  constructor(private prisma: PrismaService) {}

  async createUserLog(data: IUserLogType) {
    try {
      await this.prisma.userLog.create({
        data,
      });
    } catch (error) {
      console.log('Failed create user log: ', data);
      console.log('Error message: ', error);
    }
  }

  async findAll(userLogDto: GetUserLogsDto, req: any) {
    const merchant_id = Number(req.user?.tenant?.merchant_id);

    const skip = Number(userLogDto.offset) || 0;
    const take = Number(userLogDto.limit);

    const searchParams: any = getUserLogSearchParams(userLogDto, merchant_id);

    const userLogs = await this.prisma.userLog.findMany(take ? { ...searchParams, take, skip } : { ...searchParams, skip });
    const allUserLogs = await this.prisma.userLog.count({
      where: searchParams.where,
    });

    return {
      data: userLogs,
      meta: {
        pagination: {
          limit: take || allUserLogs,
          offset: skip,
          totalCount: allUserLogs,
        },
      },
    };
  }
}
