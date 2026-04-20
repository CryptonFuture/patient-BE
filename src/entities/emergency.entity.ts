import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Patient } from './patient.entity'

@Entity('emergency')

export class Emergency {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    emergencyName: string

    @Column()
    emergencyNumber: string

    @Column()
    insuranceProvider: string

    @Column()
    occupation: string

    @Column()
    maritalStatus: string

    @Column({ default: true })
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Patient, (patient) => patient.emergency)
    @JoinColumn()
    patient: Patient

}