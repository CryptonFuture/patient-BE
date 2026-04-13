import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    Min
} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number

}