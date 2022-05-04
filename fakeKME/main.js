const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001

app.use(cors());

const status = {
    "source_KME_ID": "AAAABBBBCCCCDDDD",
    "target_KME_ID": "EEEEFFFFGGGGHHHH",
    "master_SAE_ID": "IIIIJJJJKKKKLLLL",
    "slave_SAE_ID": "MMMMNNNNOOOOPPPP",
    "key_size": 352,
    "stored_key_count": 25000,
    "max_key_count": 100000,
    "max_key_per_request": 128,
    "max_key_size": 1024,
    "min_key_size": 64,
    "max_SAE_ID_count": 0
}

app.get('/status', (req, res) => {
    res.send(status)
})

app.listen(port, () => {
    console.log(`Fake KME listening on port ${port}`)
})