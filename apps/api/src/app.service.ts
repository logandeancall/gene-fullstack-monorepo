import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SurveyDocument, Survey, fieldValue } from './schemas/survey.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}

  get(): string {
    return this.surveyModel.find().exec() as any;
  }

  submitSurvey(results: fieldValue[]) {
    this.surveyModel.create({ fieldValues: results });
    return 'Success';
  }
}
