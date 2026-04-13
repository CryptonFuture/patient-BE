import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    Min,
    IsDateString,
    Matches,
    IsIn
} from 'class-validator'

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    gender: string
    
    @IsString()
    @IsNotEmpty()
    maritalStatus: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: string

    @IsString()
    @Matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, {
        message: 'CNIC must be in format 12345-1234567-1'
    })
    cnic: string

    @IsString()
    @Matches(/^03[0-9]{9}$/, {
        message: 'Phone number must be valid (e.g. 03XXXXXXXXX)'
    })
    phone: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number

    @IsOptional()
    @IsString()
    @IsIn(['Active', 'Inactive'], {
        message: 'Status must be Active or Inactive'
    })
    status?: string
    

}