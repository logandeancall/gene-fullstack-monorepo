import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';

@Module({
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
})
export class AppModule {}
