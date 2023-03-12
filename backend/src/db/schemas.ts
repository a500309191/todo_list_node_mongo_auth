import { getModelForClass, Ref, modelOptions, prop } from '@typegoose/typegoose';


@modelOptions({ schemaOptions: { timestamps: true, versionKey: false} })
export class User {
  @prop({ unique: true, required: true })
  public name!: string;

  @prop({ required: true })
  public password!: string;
}


@modelOptions({ schemaOptions: { timestamps: true, versionKey: false} })
export class Note {
  @prop({ required: true, minlength: 5, maxlength: 60 })
  public body!: string

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>
}


export const userModel = getModelForClass(User);
export const noteModel = getModelForClass(Note);

