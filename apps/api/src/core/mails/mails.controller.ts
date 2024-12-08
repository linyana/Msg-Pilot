import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import path from 'path';

@Controller()
@ApiTags('Mails')
export class MailController {
  @Get('redirect-middleware')
  findAll(@Req() req: any, @Res() res: any, @Query() query: any) {
    if (new Date().getTime() < Number(query.ExpirationTime)) {
      const fileURL = req.url.split('&fileURL=');
      res.redirect(fileURL[1]);
    } else {
      res.render(path.join(__dirname, '../../../../apps/api/src/mails/templates/expiration.ejs'));
    }
    return '';
  }
}
