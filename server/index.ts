import express from 'express'
import type { Express,Router,Request,Response} from 'express'
import axios from 'axios'

const app:Express = express()

const router:Router = express.Router()

app.use("*",(req, res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use('/api',router)

router.get('/list', async (req:Request, res:Response) => {
    const {data} = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf')
    res.json({data})
})

app.listen(3000, () => {
    console.log("服务启动成功：http://localhost:3000/");
    
})