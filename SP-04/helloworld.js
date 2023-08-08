const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('Hello World, llinco abc');
    res.send('Llinco');
    }
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) //use backticks, not single quote
    }
)