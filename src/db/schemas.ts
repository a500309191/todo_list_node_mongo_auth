import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref
} from '@typegoose/typegoose';


export class User {
  @prop({ unique: true, required: true })
  public name!: string;

  @prop({ required: true, minLength: 8, maxLength: 100 })
  public password!: string;

  @prop({ ref: () => Note })
  public notes!: Ref<Note>[];
}


export class Note {
  @prop({ required: true, minLength: 10, maxLength: 255 })
  public body!: string

  @prop({ default: false })
  public isDone!: boolean
}


export const userModel = getModelForClass(User);
export const noteModel = getModelForClass(Note);

