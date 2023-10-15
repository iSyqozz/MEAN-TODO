import {Collection, MongoClient, ServerApiVersion,} from "mongodb";
import { TODO } from "../models";


export async function getMongoClient(uri: string): Promise<Collection | null> {
    try {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        return client.db('TODO_APPLICATION').collection('TODO');
    } catch (e) {
        console.log(e);
        return null
    }
}


export async function getEntries(collection: Collection):Promise<TODO[]> {

    const cursor = collection.find();
    const entries = await cursor.toArray();

    return entries.map((entry, _) => {
        return {
            content: entry.content,
            priority: entry.priority,
            id: entry.id
        }
    }) as TODO[]
}



export async function addorUpdateEntry(entry: TODO, collection: Collection) {

    const filter = { id: entry.id };
    const updateDocumentQuery = {
        $set: entry
    }
    await collection.updateOne(filter, updateDocumentQuery, { upsert: true })
}


export async function deleteEntry(entry: TODO, collection: Collection) {

    const filter = { id: entry.id };
    await collection.deleteOne(filter)

}



