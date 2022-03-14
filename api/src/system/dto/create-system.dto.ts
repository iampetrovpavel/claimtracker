import { IsString } from "class-validator";

export class CreateSystemDto {
    @IsString({message:'Имя должно быть строкой!'})
    name: string;

    @IsString()
    description: string;
}