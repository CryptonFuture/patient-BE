import { DataSource } from 'typeorm'

export const BloodGroupSeed = async (dataSouce: DataSource) => {
    const repo = dataSouce.getRepository('bloodgroup')

    const bloodgroup = [
        { name: 'A+', status: true },
        { name: 'A-', status: true },
        { name: 'B+', status: true },
        { name: 'B-', status: true },
        { name: 'AB+', status: true },
        { name: 'AB-', status: true },
        { name: 'O+', status: true },
        { name: 'O-', status: true }
    ]

    for(const bg of bloodgroup) {
        const exists = await repo.findOne({
            where: {name: bg.name}
        })

        if(!exists) {
            await repo.save(bg)
        }
    }
    console.log('✅ Blood Group Seeded');
}