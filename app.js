const express   = require('express')
const app       = express()
const port      = process.env.PORT || 5000

app.use(express.static('public'))

app.listen(port, () => console.log(`3Dbin app listening on http://127.0.0.1:${port}!`))
