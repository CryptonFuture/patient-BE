import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Patient } from './patient.entity'

@Entity('contacts')

export class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    phone: string

    @Column()
    alternatePhone: string

    @Column()
    city: string

    @Column()
    country: string

    @Column({unique: true})
    email: string

    @Column()
    address: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Patient, (patient) => patient.contact)
    @JoinColumn()
    patient: Patient
}