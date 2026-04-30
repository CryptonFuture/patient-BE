import { DataSource } from 'typeorm'

export const PatientTypeSeed = async (dataSouce: DataSource) => {
    const repo = dataSouce.getRepository('type')

    const patientType = [
        { name: 'OPD', status: true },
        { name: 'IPD', status: true },
        { name: 'Emergency', status: true },
        { name: 'DayCare', status: true },
        { name: 'Telemedicine', status: true },
        { name: 'Referral', status: true },
        { name: 'WalkIn', status: true }
    ]

    for(const pt of patientType) {
        const exists = await repo.findOne({
            where: {name: pt.name}
        })

        if(!exists) {
            await repo.save(pt)
        }
    }
    console.log('✅ Patient Type Seeded');
}