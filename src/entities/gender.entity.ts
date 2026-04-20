import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('genders')

export class Gender {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date
}