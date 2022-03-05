import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface SystemModel extends Base { }

export class SystemModel extends TimeStamps {
    @prop()
    name: string;

    @prop()
    description: string;
}