const express = require('express')
const app = express()

// request = pedido
// response = reposta
app.get('/', (request, response) => {
    return response.send('ok')
})

app.listen(3000)