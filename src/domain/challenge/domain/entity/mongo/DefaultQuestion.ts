import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DefaultQuestionDocument = DefaultQuestion & Document;

@Schema({ timestamps: true })
export class DefaultQuestion {
  @Prop({ required: true })
  content: string;

  @Prop({ enum: ['basic', 'special'], required: true })
  type: 'basic' | 'special';

  @Prop()
  keyword?: string[];
}

export const DefaultQuestionSchema = SchemaFactory.createForClass(DefaultQuestion);
