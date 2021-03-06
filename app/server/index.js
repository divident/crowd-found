const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

