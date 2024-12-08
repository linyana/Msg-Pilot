import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedService } from './red.service';
import { CreateRedDto } from './dto/create-red.dto';
import { UpdateRedDto } from './dto/update-red.dto';

@Controller('red')
export class RedController {
  constructor(private readonly redService: RedService) {}

  @Post()
  create(@Body() createRedDto: CreateRedDto) {
    return this.redService.create(createRedDto);
  }

  @Get()
  findAll() {
    return this.redService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedDto: UpdateRedDto) {
    return this.redService.update(+id, updateRedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redService.remove(+id);
  }
}
