import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';


export class User {
  @prop({ unique: true, required: true })
  public name!: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false  })
  public password!: string;
}


export const userModel = getModelForClass(User);

