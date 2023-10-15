import { Request, Response } from "express"
import { getMongoClient, deleteEntry } from "../services"
import dotenv from "dotenv"
import { Collection } from "mongodb"
import { v4 } from 'uuid';

export const deleteTODO = (async (req: Request, res: Response) => {
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
                    message: 'failed to delete',
                }
            })
        }

        const mongo_connection = await getMongoClient(process.env.MONGO_CONNECTION as string);

        if (!mongo_connection) {
            throw new Error('Failed to get Mongo Connection')
        }

        await deleteEntry({ content: content, priority: priority, id: id }, mongo_connection as Collection)

        res.status(200).json({
            status: 'success',
            data: {
                message: 'deleted successfuly',
                content: content,
                priority: priority
            }
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'failed',
            data: {
                message: 'failed to delete',
            }
        })
    }
})