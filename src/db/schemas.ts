import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref
} from '@typegoose/typegoose';


@modelOptions({ schemaOptions: { timestamps: true, versionKey: false} })
export class User {
  @prop({ unique: true, required: true })
  public name!: string;

  @prop({ required: true, minLength: 8, maxLength: 100 })
  public password!: string;

  // @prop({ ref: () => Note })
  // public notes!: Ref<Note>[];
}

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false} })
export class Note {
  @prop({ required: true, minLength: 10, maxLength: 255 })
  public body!: string

  @prop({ default: false })
  public isDone!: boolean

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>
}

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false} })
export class Token {
  @prop({ required: true })
  public accessToken!: string

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>
}


export const userModel = getModelForClass(User);
export const noteModel = getModelForClass(Note);
export const tokenModel = getModelForClass(Token);

