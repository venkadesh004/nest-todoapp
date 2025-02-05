import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @HttpCode(200)
  @Get('/getAllList')
  getAllList(@Req() req: Request) {
    // console.log(req.body.email);
    return this.listService.getAllList(req.body.email);
  }

  @Post('/addList')
  addList(@Req() req: Request) {
    // console.log(req['email']);
    return this.listService.addList(req.body.email, req.body.content);
  }

  @Patch('/updateList/:id')
  updateList(@Req() req: Request, @Param('id') id: string) {
    return this.listService.updateList(req.body.email, req.body.content, id);
  }

  @Delete('/delete/:id')
  deleteList(@Param('id') id: string) {
    return this.listService.deleteList(id);
  }
}
