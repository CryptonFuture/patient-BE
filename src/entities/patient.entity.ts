import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('patients')

export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    gender: string

    @Column()
    maritalStatus: string

    @Column()
    address: string

    @Column({ type: 'date' })
    dateOfBirth: Date

    @Column({ unique: true })
    cnic: string

    @Column()
    phone: string

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    age: number

    @Column({default: 'Active'})
    status: string

    @CreateDateColumn()
    createdAt: Date
}