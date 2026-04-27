import { Transform } from 'class-transformer'
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    Min,
    IsDateString,
    Matches,
    IsIn,
    IsBoolean
} from 'class-validator'

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty({ message: 'firstname is required' })
    firstname: string

    @IsString()
    @IsNotEmpty({ message: 'lastname is required' })
    lastname: string

    @IsString()
    @IsOptional()
    gender: string

    @IsString()
    @IsOptional()
    maritalStatus: string

    @IsString()
    @IsOptional()
    address: string

    @IsDateString()
    @IsOptional()
    dateOfBirth: string

    @IsString()
    @IsNotEmpty({ message: 'cnic is required' })
    @Matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, {
        message: 'CNIC must be in format 12345-1234567-1'
    })
    cnic: string

    @IsString()
    @IsNotEmpty({ message: 'phone no is required' })
    @Matches(/^03[0-9]{9}$/, {
        message: 'Phone number must be valid (e.g. 03XXXXXXXXX)'
    })
    phone: string

    @IsString()
    @IsOptional()
    @Matches(/^03[0-9]{9}$/, {
        message: 'Phone number must be valid (e.g. 03XXXXXXXXX)'
    })
    alternatePhone: string

    @IsEmail()
    @IsNotEmpty({ message: 'email is required' })
    email: string

    @IsString()
    @IsOptional()
    city: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    bloodGroup: string

    @IsString()
    @IsOptional()
    height: string

    @IsString()
    @IsOptional()
    weight: string

    @IsString()
    @IsOptional()
    allergies: string

    @IsString()
    @IsOptional()
    diseases: string

    @IsString()
    @IsOptional()
    medications: string

    @IsString()
    @IsOptional()
    patientType: string

    @IsString()
    @IsOptional()
    department: string

    @IsString()
    @IsOptional()
    assignedDoctor: string

    @IsString()
    @IsOptional()
    registerDate: string

    @IsString()
    @IsOptional()
    emergencyName: string

    @IsString()
    @IsOptional()
    emergencyNumber: string

    @IsString()
    @IsOptional()
    insuranceProvider: string

    @IsString()
    @IsOptional()
    occupation: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number

    @IsOptional()
    @Transform(({ value }) => value === 'Active' || value === true)
    @IsBoolean()
    status?: boolean;


}