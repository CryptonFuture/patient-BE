import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'

@Entity('departments')

export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

}