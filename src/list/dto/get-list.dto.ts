import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GetListDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}