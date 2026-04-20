import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Patient } from './patient.entity'

@Entity('register')

export class Register {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    patientType: string

    @Column()
    department: string

    @Column()
    assignedDoctor: string

    @Column()
    registerDate: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Patient, (patient) => patient.registration)
    @JoinColumn()
    patient: Patient
}