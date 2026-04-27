import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm'
import { Professional } from './professional.entity'
import { Schedule } from './schedule.entity'
import { System } from './systemFields.entity'

@Entity('doctors')

export class Doctor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    gender: string

    @Column({ type: 'date' })
    dateOfBirth: Date

    @Column()
    address: string

    @Column({unique: true})
    phone: string

    @Column({unique: true})
    email: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Professional, (professional) => professional.doctor, {cascade: true})
    professional: Professional
    
    @OneToOne(() => Schedule, (schedule) => schedule.doctor, {cascade: true})
    schedule: Schedule
    
    @OneToOne(() => System, (system) => system.doctor, {cascade: true})
    system: System

}