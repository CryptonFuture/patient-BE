import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { State } from './state.entity'

@Entity('cities')

export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => State)
    @JoinColumn({name: 'state_id'})
    state: State
}