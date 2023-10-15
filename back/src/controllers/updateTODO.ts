import { Request, Response } from "express"
import { getMongoClient, addorUpdateEntry } from "../services"
import dotenv from "dotenv"
import { Collection } from "mongodb"


export const updateTODO = (async (req: Request, res: Response) => {
    try {

        dotenv.config()

        const body = req.body

        const content = body.content
        const priority = body.priority
        const id = body.id

        if (!content || !priority || !id) {
            res.status(400).json({
                status: 'failed',
                data: {
                    message: 'failed to add or update',
                }
            })
        }

        const mongo_connection = await getMongoClient(process.env.MONGO_CONNECTION as string);


        if (!mongo_connection) {
            throw new Error('Failed to get Mongo Connection')
        }

        await addorUpdateEntry({ content: content, priority: priority, id: id }, mongo_connection as Collection)

        res.status(200).json({
            status: 'success',
            data: {
                message: 'added or updated successfuly',
                content: content,
                priority: priority
            }
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'failed',
            data: {
                message: 'failed to add or update',
            }
        })
    }
})