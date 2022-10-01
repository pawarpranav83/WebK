// const server = http.createServer(async (req, res) => {
//   const { query, pathname } = url.parse(req.url, true)
//   if (pathname === '/' || pathname === '/overview') {
//     res.writeHead(200, {
//       'Content-type': 'text/html',
//     })
//     let resObjs = []
//     console.log(resNamesObj)

//     for (var i = 0; i < resNamesObj.length; i++) {
//       const data = await client.query(`Select * from additionalinfo where resname='${resNamesObj[i].resName}'`)
//       console.log('41', data.rows[0])
//       resObjs.push(data.rows[0])
//     }

//     console.log('printing final resOBjs')
//     console.log(resObjs)
//     const cardsHtml = resObjs.map((el) => replaceTemplate(el, tempCard)).join('')
//     console.log(cardsHtml)
//     const output = tempOverview.replace('{%res-cards%}', cardsHtml)
//     res.end(output)
//   }
// })