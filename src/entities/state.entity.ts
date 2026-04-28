import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Country } from './country.entity'

@Entity('states')

export class State {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Country)
    @JoinColumn({name: 'country_id'})
    country: Country
    
}