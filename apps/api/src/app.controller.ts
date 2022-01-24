import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): string {
    return this.appService.get();
  }

  @Post('survey')
  submitSurvey(@Body() results: any) {
    return this.appService.submitSurvey(results);
  }
}
