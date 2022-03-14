import { prop } from '@typegoose/typegoose';

export class UserModel {
    @prop()
    name: string

    @prop({ unique: true })
    email: string

    @prop()
    groups: string[]

    @prop()
    passwordHash: string
}
