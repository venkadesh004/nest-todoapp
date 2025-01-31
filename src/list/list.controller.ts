import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { GetListDto } from './dto/get-list.dto';
import { CreateListDto } from './dto/create-list.dto';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @HttpCode(200)
    @Post('/getAllList')
    getAllList(@Body() list: GetListDto) {
        return this.listService.getAllList(list.email);
    }

    @Post('/addList')
    addList(@Body() listData: CreateListDto) {
        return this.listService.addList(listData);
    }

    @Patch('/updateList/:id')
    updateList(@Body() listData: CreateListDto, @Param('id') id: string) {
        return this.listService.updateList(listData, id);
    }

    @Delete('/delete/:id')
    deleteList(@Param('id') id: string) {
        return this.listService.deleteList(id);
    }
}
