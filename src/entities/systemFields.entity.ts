import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Doctor } from './doctor.entity'

@Entity('systems')

export class System {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    joiningDate: string

    @Column({type: 'varchar', nullable: true})
    profileImage?: string

    @Column()
    remarks: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Doctor, (doctor) => doctor.system)
    @JoinColumn()
    doctor: Doctor

}