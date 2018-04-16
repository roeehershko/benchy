const express = require('express');
const redis = require("redis");
const app = express();
const client = redis.createClient({
    host: 'redis'
});
const uuidv4 = require('uuid/v4');

// Testing set only
app.get('/set', (req, res) => {
    const key = uuidv4();

    client.set(uuidv4(), JSON.stringify(req.headers));

    res.send('New redis key - ' + key);
});

// Testing set and get on the same request
let oldKey = null;
app.get('/set_get', (req, res) => {
    const key = uuidv4();

    client.set(uuidv4(), JSON.stringify(req.headers));

    if (oldKey) {
        client.get(oldKey,() => {
            res.send('Old redis key - ' + key);
        });
    }
    else {
        oldKey = key;
        res.send('New redis key - ' + key);
    }
});

app.listen(80, () => console.log('Listening on port 3000'));