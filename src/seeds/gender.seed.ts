import { DataSource } from 'typeorm'

export const GenderSeed = async (dataSouce: DataSource) => {
    const repo = dataSouce.getRepository('genders')

    const genders = [
        { gender: 'male', status: true },
        { gender: 'female', status: true },
    ]

    for(const g of genders) {
        const exists = await repo.findOne({
            where: {gender: g.gender}
        })

        if(!exists) {
            await repo.save(g)
        }
    }
    console.log('✅ Gender Seeded');
}