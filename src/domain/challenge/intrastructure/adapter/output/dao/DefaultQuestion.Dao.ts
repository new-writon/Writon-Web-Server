import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DefaultQuestionRepository } from 'src/domain/challenge/application/port/output/DefaultQuestion.Repository';
import {
  DefaultQuestion,
  DefaultQuestionDocument,
} from 'src/domain/challenge/domain/entity/mongo/DefaultQuestion';

@Injectable()
export class DefaultQuestionDao implements DefaultQuestionRepository {
  constructor(
    @InjectModel(DefaultQuestion.name)
    private readonly defaultQuestionModel: Model<DefaultQuestionDocument>,
  ) {}
  async findDefaultQuestion() {
    return this.defaultQuestionModel.find();
  }

  async findDefaultBasicQuestion() {
    return this.defaultQuestionModel.find({
      type: 'basic',
    });
  }

  async findDefaultSpecialQuestion() {
    return this.defaultQuestionModel.find({
      type: 'special',
    });
  }

  async insertDefaultQuestion() {
    const data: CreateDefaultQuestionDto = {
      content: '오늘 하루를 돌아보며 가장 기억에 남는 일은 무엇인가요?',
      type: 'basic',
      keyword: ['회고', '일상', '기억'],
    };

    const created = new this.defaultQuestionModel(data);
    return created.save();
  }
}

export class CreateDefaultQuestionDto {
  content: string;
  type: 'basic' | 'special';
  keyword?: string[];
}
