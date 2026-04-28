import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('countries')

export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    code: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date
}