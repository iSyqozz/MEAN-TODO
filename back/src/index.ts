import express from "express";
import { addTODO, updateTODO, deleteTODO, getTODO } from './controllers';
import cors from "cors";

async function main() {

    console.log(process.env.NODE_ENV);

    //intializing express application
    const app = express()


    //json parsing middleware
    app.use(express.json());
    app.use(cors());


    //router middleware
    const router = express.Router()
    app.use(router);


    //instantiating routes 
    router.get('/getTODO', getTODO)
    router.post('/addTODO', addTODO)
    router.delete('/deleteTODO', deleteTODO)
    router.patch('/updateTODO', updateTODO)

    //port and host 
    const port = 3000;
    const host = '127.0.0.1'



    //starting server

    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'development') {
        app.listen(port, host, () => {
            console.log('listening on port ' + port + 'in development')
        })
    }else{
        app.listen(port, host, () => {
            console.log('listening on port ' + port +' in production')
        })
    }

}


//program entrypoint
main()
