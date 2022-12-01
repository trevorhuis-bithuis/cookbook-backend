import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: 'Trevor Huis in \'t Veld',
            username: 'trevorhuis@prisma.io',
            password: 'secret',
            profile: {
                create: { bio: 'the best baker' },
            },
        },
    })
    const allUsers = await prisma.user.findMany({
        include: {
            profile: true,
        },
    })
    console.dir(allUsers, { depth: null })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })