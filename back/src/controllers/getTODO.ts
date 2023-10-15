import { Request, Response } from "express"
import { getMongoClient,} from "../services"
import dotenv from "dotenv"
import { Collection } from "mongodb"
import { getEntries } from "../services"

export const getTODO = (async (req: Request, res: Response) => {
    try {

        dotenv.config()
        
        const mongo_connection = await getMongoClient(process.env.MONGO_CONNECTION as string);
        
        if (!mongo_connection){
            throw new Error('Failed to get Mongo Connection')
        }
        
        const entries = await getEntries(mongo_connection as Collection);

        res.status(200).json({
            status: 'success',
            data: {
                message: 'retrieved resources successfully',
                entries: entries
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'failed',
            data: {
                message: 'failed to retrieve resources',
            }
        })
    }
})