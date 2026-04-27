import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Doctor } from './doctor.entity'

@Entity('schedules')

export class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text', {array: true})
    availableDays: string[];

    @Column({ type: 'time' })
    availableTimeStart: string

    @Column({ type: 'time' })
    availableTimeEnd: string

    @Column({type: 'int'})
    consultationDuration: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Doctor, (doctor) => doctor.schedule)
    @JoinColumn()
    doctor: Doctor

}