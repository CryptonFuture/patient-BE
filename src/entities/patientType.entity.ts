import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'

@Entity('type')

export class PatientType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

}