import { IsString } from "class-validator";

export class AuthDto {
    @IsString()
    login: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}