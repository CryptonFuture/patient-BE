import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'

@Entity('diseases')

export class Diseases {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

}