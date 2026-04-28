import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { City } from './city.entity'

@Entity('zipcodes')

export class Zipcode {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => City)
    @JoinColumn({name: 'city_id'})
    city: City
}