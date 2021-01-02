require("dotenv").config()
const express = require('express')
const http = require("http")
const WebSocket = require("ws")
var cors = require('cors')


const db = require('./services/database')

const app = express()

app.use(cors())
app.use(express.json())

const port = 3000

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection",(ws)=>{
    console.log("Connection received");
    ws.on("message",(data)=>{
        let obj
        try {
            obj = JSON.parse(data)
            if(!obj["sender"] || !obj["message"]){
                throw "Parse error"
            }
        } catch (error) {
            ws.send("Error parsing data")
            return
        }
        wss.clients.forEach(client=>{
            client.send(data)
        })
        
    })
})

const userRouter = require('./routes/user')
app.use("/users",userRouter)

const teamsRouter = require('./routes/team')
app.use("/teams",teamsRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})