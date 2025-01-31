import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}