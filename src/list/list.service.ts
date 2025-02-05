import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from 'src/schemas/list.schema';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  getAllList(email: string) {
    const lists = this.listModel.find({ email: email }).exec();
    return lists;
  }

  addList(email: string, content: string) {
    // console.log(email, content);
    const newList = new this.listModel({ email, content });
    // console.log(newList);
    return newList.save();
  }

  updateList(email: string, content: string, id: string) {
    // console.log(id);
    const updateList = this.listModel.updateOne(
      { _id: id },
      { email, content },
    );
    return updateList.exec();
  }

  deleteList(id: string) {
    // console.log(id);
    const deleteList = this.listModel.deleteOne({ _id: id });

    return deleteList.exec();
  }
}
