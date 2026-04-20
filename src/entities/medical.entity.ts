import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Patient } from './patient.entity'

@Entity('medicals')

export class Medical {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bloodGroup: string

    @Column()
    height: string

    @Column()
    weight: string

    @Column()
    allergies: string

    @Column()
    diseases: string

    @Column()
    medications: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Patient, (patient) => patient.medical)
    @JoinColumn()
    patient: Patient
}