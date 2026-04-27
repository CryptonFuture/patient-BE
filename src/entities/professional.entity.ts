import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Doctor } from './doctor.entity'

@Entity('professionals')

export class Professional {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    specialization: string

    @Column()
    department: string

    @Column()
    qualification: string

    @Column()
    experience: string

    @Column({type: 'int'})
    licenseNumber: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Doctor, (doctor) => doctor.professional)
    @JoinColumn()
    doctor: Doctor

}