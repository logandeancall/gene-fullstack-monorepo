import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyDocument = Survey & Document;

export type fieldValue = {
  title: string;
  type: string;
  values: string[];
};

export class FieldValue implements fieldValue {
  title: string;
  type: string;
  values: string[];
}

@Schema()
export class Survey {
  @Prop([FieldValue])
  fieldValues: fieldValue[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
