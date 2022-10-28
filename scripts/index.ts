import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const ephemeralDb = "ephemeral"
const messagesColl = "messages"
const MONGODB_PW = process.env.MONGODB_PW

const fiveDaysInSecs = 432000

const connectDb = async (): Promise<MongoClient> =>
    await MongoClient.connect(
        `mongodb+srv://nate:${MONGODB_PW}@cluster0.es9vt.mongodb.net/${ephemeralDb}?retryWrites=true&w=majority`
    );

const prepDb = async () => {
    const client = await connectDb()

    const resCoords = await client.db(ephemeralDb).collection(messagesColl).createIndex({ coords: "2dsphere" })

    if (resCoords) {
        console.log(resCoords)
    } else {
        return console.log("There was an issue with indexing coords")
    }

    const resVisitorId = await client.db(ephemeralDb).collection(messagesColl).createIndex({ visitorId: 1 })

    if (resVisitorId) {
        console.log(resVisitorId)
    } else {
        return console.log("There was an issue with indexing visitorId")
    }

    // Unit is in seconds
    // Set to 5 days
    const resCreatedAt = await client.db(ephemeralDb).collection(messagesColl).createIndex({ "createdAt": 1 }, { expireAfterSeconds: fiveDaysInSecs })

    if (resCreatedAt) {
        console.log(resCreatedAt)
    } else {
        return console.log("There was an issue with indexing visitorId")
    }

    client.close()

    return console.log("All indexes successfully created.")
}


const fixtures = [
    {
        visitorId: "fixture1",
        message: "I called them Nudes. Nude #1. Woman alone on a hill. She stands into the wind. It is a hard wind slanting from the north. Long flaps and shreds of flesh rip off the woman’s body and lift and blow away on the wind, leaving an exposed column of nerve and blood and muscle calling mutely through lipless mouth. It pains me to record this, - Anne Carson",
        coords: {
            type: "Point",
            coordinates: [18.070034, 59.339036],
        },
        readCount: 3,
        createdAt: new Date(),
    },
    {
        visitorId: "fixture2",
        message: "They fuck you up, your mum and dad. They may not mean to, but they do. They fill you with the faults they had And add some extra, just for you. But they were fucked up in their turn By fools in old- style hats and coats, Who half the time were soppy - stern And half at one another’s throats.- Philip Larkin",
        coords: {
            type: "Point",
            coordinates: [18.058721, 59.338120],
        },
        readCount: 3,
        createdAt: new Date(),
    },
    {
        visitorId: "fixture3",
        message: "While in summer trees thirst In foothills thazin flowers Are climbing thabye trees Eff'using fragrance Mixing with the wafting air. At sunset crow- pheasants are cooing, And from afar come the cuckoo's notes. Now and again thunder is beating Through heaven's expanses Like lambara and deindi drums. And I... - U Kyaw.",
        coords: {
            type: "Point",
            coordinates: [18.058710, 59.331003],
        },
        readCount: 4,
        createdAt: new Date(),
    },
    {
        visitorId: "fixture4",
        message: "Of course I can be Anjani whose ambition turned her into a monkey Or Savitri, who staggered to find her man although she was beautiful and clever Perhaps I could be Calon Arang, the powerful woman victim of patriarchy Or maybe Bahu Laweyan, with a beauty spot on my shoulder, Whose body makes me the target of domestic murder - Siwi Dwi Saputro",
        coords: {
            type: "Point",
            coordinates: [18.046709, 59.336636],
        },
        readCount: 4,
        createdAt: new Date(),
    }
]

const createFixtures = async () => {
    const client = await connectDb()

    const result = await client
        .db(ephemeralDb)
        .collection(messagesColl)
        .bulkWrite(fixtures.map(
            item => ({ insertOne: { document: item } })
        ))

    console.log(result)

    client.close()
}

const deleteFixtures = async () => {
    const client = await connectDb()

    const result = await client
        .db(ephemeralDb)
        .collection(messagesColl)
        .deleteMany({ visitorId: { $regex: /fixture./ } })

    console.log(result)

    client.close()
}

// prepDb()
createFixtures()
// deleteFixtures()