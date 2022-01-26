const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors())
app.get('/', function(req, res) {
    res.json({
        success: true,
        data: ["Trivial", "Regular", "Urgent"]
    });
});

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});