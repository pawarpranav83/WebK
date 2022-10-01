const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./replaceTemplate')
const { Client } = require('pg')
const express = require('express')
const app = express()

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '183923',
  database: 'FoodShades',
})
client.connect()
const tempCard = fs.readFileSync(`${__dirname}/templates/temp-res-card.html`, 'utf-8')
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')

const resNamesObj = []

//Getting Restaurant Names
async function getNames() {
  const rn = await client.query(`Select * from resnames`)
  for (let i = 0; i < rn.rows.length; i++) {
    resNamesObj.push(rn.rows[i])
  }
}
getNames()
//Routes
app.get('/', async (req, res) => {
  let resObjs = []
  for (var i = 0; i < resNamesObj.length; i++) {
    const data = await client.query(`Select * from additionalinfo where resname='${resNamesObj[i].resname}'`)

    resObjs.push(data.rows[0])
  }

  const cardsHtml = resObjs.map((el) => replaceTemplate(el, tempCard)).join('')
  const output = tempOverview.replace('{%res-cards%}', cardsHtml)
  res.send(output)
})
app.get('/VegOnly', async (req, res) => {
  let resObjs = []
  
  const data = await client.query(`Select * from additionalinfo where category='V'`)
  for (let i = 0; i < data.rows.length; i++) {
    resObjs.push(data.rows[i])
  }
  const cardsHtml = resObjs.map((el) => replaceTemplate(el, tempCard)).join('')
  const output = tempOverview.replace('{%res-cards%}', cardsHtml)
  res.send(output)
})
app.get('/ByRating',async (req,res)=>{
  let resObjs = []
  for (var i = 0; i < resNamesObj.length; i++) {
    const data = await client.query(`Select * from additionalinfo where resname='${resNamesObj[i].resname}'`)

    resObjs.push(data.rows[0])
  }
  resObjs.sort((a,b)=>b.totrating-a.totrating)
  const cardsHtml = resObjs.map((el) => replaceTemplate(el, tempCard)).join('')
  const output = tempOverview.replace('{%res-cards%}', cardsHtml)
  res.send(output)
})
app.get('/ByDeliveryTime',async (req,res)=>{
  let resObjs = []
  for (var i = 0; i < resNamesObj.length; i++) {
    const data = await client.query(`Select * from additionalinfo where resname='${resNamesObj[i].resname}'`)

    resObjs.push(data.rows[0])
  }
  resObjs.sort((a,b)=>a.deliverytime-b.deliverytime)
  const cardsHtml = resObjs.map((el) => replaceTemplate(el, tempCard)).join('')
  const output = tempOverview.replace('{%res-cards%}', cardsHtml)
  res.send(output)
})


app.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
