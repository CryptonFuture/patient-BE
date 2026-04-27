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

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty({ message: 'firstname is required' })
    firstname: string

    @IsString()
    @IsNotEmpty({ message: 'lastname is required' })
    lastname: string

    @IsString()
    @IsNotEmpty({ message: 'gender is required' })
    gender: string

    @IsString()
    @IsOptional()
    specialization: string

    @IsString()
    @IsNotEmpty({ message: 'address is required' })
    address: string

    @IsDateString()
    @IsNotEmpty({ message: 'dateOfBirth is required' })
    dateOfBirth: string

    @IsString()
    @IsOptional()
    qualification: string

    @IsString()
    @IsOptional()
    experience: string

    @IsEmail()
    @IsNotEmpty({ message: 'email is required' })
    email: string

    @IsString()
    @IsNotEmpty({ message: 'phone no is required' })
    phone: string

    @IsString()
    @IsOptional()
    licenseNumber: string

    @IsString()
    @IsOptional()
    availableDays: string

    @IsString()
    @IsOptional()
    availableTimeStart: string

    @IsString()
    @IsOptional()
    availableTimeEnd: string

    @IsString()
    @IsOptional()
    consultationDuration: string

    @IsString()
    @IsOptional()
    department: string

    @IsString()
    @IsNotEmpty({ message: 'joining date is required' })
    joiningDate: string

    @IsString()
    @IsOptional()
    profileImage: string

    @IsString()
    @IsOptional()
    remarks: string

    @IsOptional()
    @Transform(({ value }) => value === 'Active' || value === true)
    @IsBoolean()
    status?: boolean;


}

