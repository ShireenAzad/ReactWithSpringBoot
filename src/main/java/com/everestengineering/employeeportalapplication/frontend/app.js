const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to CORS server')
})
app.get('/cors', (req, res) => {
    res.send('This has CORS enabled')
})
app.listen(9090, () => {
    console.log('listening on port 8080')
})