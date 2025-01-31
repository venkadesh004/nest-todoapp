import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from 'src/schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
    constructor(@InjectModel(List.name) private listModel: Model<List>) { }

    getAllList(email: string) {
        const lists = this.listModel.find({ email: email }).exec();
        return lists;
    }

    addList(listData: CreateListDto) {
        const newList = new this.listModel(listData);
        return newList.save();
    }

    updateList(listData: CreateListDto, id: string) {
        // console.log(id);
        const updateList = this.listModel.updateOne({ _id: id }, listData);
        return updateList.exec();
    }

    deleteList(id: string) {
        // console.log(id);
        const deleteList = this.listModel.deleteOne({ _id: id });

        return deleteList.exec();
    }
}
