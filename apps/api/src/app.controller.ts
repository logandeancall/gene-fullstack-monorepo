import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Survey } from './schemas/survey.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get() {
    return this.appService.get();
  }

  @Post('survey')
  submitSurvey(@Body() results: any) {
    return this.appService.submitSurvey(results);
  }
}
