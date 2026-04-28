import { DataSource } from 'typeorm'

export const DepartmentSeed = async (dataSouce: DataSource) => {
    const repo = dataSouce.getRepository('departments')

    const departments = [
        { name: 'Cardiology', status: true },
        { name: 'Neurology', status: true },
        { name: 'Orthopedic', status: true },
        { name: 'Pediatrics', status: true },
        { name: 'Gynecology', status: true },
        { name: 'Ophthalmology', status: true },
        { name: 'Dental', status: true },
        { name: 'Dermatology', status: true },
        { name: 'Emergency', status: true },
    ]

    for(const d of departments) {
        const exists = await repo.findOne({
            where: {name: d.name}
        })

        if(!exists) {
            await repo.save(d)
        }
    }
    console.log('✅ Department Seeded');
}