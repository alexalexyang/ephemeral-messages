import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const ephemeralDb = "ephemeral"
const messagesColl = "messages"
const MONGODB_PW = process.env.MONGODB_PW

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
    const resCreatedAt = await client.db(ephemeralDb).collection(messagesColl).createIndex({ "createdAt": 1 }, { expireAfterSeconds: 432000 })

    if (resCreatedAt) {
        console.log(resCreatedAt)
    } else {
        return console.log("There was an issue with indexing visitorId")
    }

    client.close()

    return console.log("All indexes successfully created.")
}

prepDb()