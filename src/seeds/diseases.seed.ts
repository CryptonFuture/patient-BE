import { DataSource } from 'typeorm'

export const DiseasesSeed = async (dataSouce: DataSource) => {
    const repo = dataSouce.getRepository('diseases')

    const diseases = [
        { name: 'Diabetes', status: true },
        { name: 'Hypertension', status: true },
        { name: 'Asthma', status: true },
        { name: 'Tuberculosis', status: true },
        { name: 'COVID-19', status: true },
        { name: 'Hepatitis', status: true },
        { name: 'Cancer', status: true },
        { name: 'Heart Disease', status: true },
        { name: 'Kidney Disease', status: true },
        { name: 'Arthritis', status: true }
    ]

    for(const d of diseases) {
        const exists = await repo.findOne({
            where: {name: d.name}
        })

        if(!exists) {
            await repo.save(d)
        }
    }
    console.log('✅ Diseases Seeded');
}