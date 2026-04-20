import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm'
import { Contact } from './contact.entity'
import { Medical } from './medical.entity'
import { Emergency } from './emergency.entity'
import { Register } from './register.entity'

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

    @Column({ type: 'date' })
    dateOfBirth: Date

    @Column({ unique: true })
    cnic: string

    @Column({nullable: true})
    age: number

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Medical, (medical) => medical.patient, {cascade: true})
    medical: Medical

    @OneToOne(() => Contact, (contact) => contact.patient, {cascade: true})
    contact: Contact

    @OneToOne(() => Emergency, (emergency) => emergency.patient, {cascade: true})
    emergency: Emergency

    @OneToOne(() => Register, (registration) => registration.patient, {cascade: true})
    registration: Register

   
}