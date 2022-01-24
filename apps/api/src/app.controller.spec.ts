import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveySchema, Survey, FieldValue } from './schemas/survey.schema';

const testFieldValues = [
  {
    title:
      'Do you solemnly swear to answer the following questions truthfully?',
    type: 'radio',
    values: ['I do'],
  },
  {
    title:
      'Which features made you want to play Genopets the most? Please rank 1-6 with 1 being the most',
    type: 'ranked',
    values: ['Earning Tokens', 'Battling', 'Exploring the Genoverse'],
  },
  {
    title: 'What level of feedback are you willing to give?',
    type: 'radio',
    values: [
      'Maximum - I’d love to get on a zoom call with the genopets team and do a user interview',
    ],
  },
];

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/surveys'),
        MongooseModule.forFeature([
          {
            name: Survey.name,
            schema: SurveySchema,
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should successfully submit a survey', async () => {
      let response = await appController.submitSurvey(testFieldValues);
      expect(response).toBe('Success');
    });
    it('first submitted survey fields values to be truthy', async () => {
      let surveys = await appController.get();
      let fieldValues = surveys[surveys.length - 1].fieldValues;
      expect(fieldValues[0].title).toBeTruthy();
      expect(fieldValues[0].type).toBeTruthy();
      expect(fieldValues[0].values).toBeTruthy();
    });
  });
});
