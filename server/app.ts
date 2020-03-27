// lib/app.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

function helloworld(req: express.Request, res: express.Response)
{
    res.send("Hello World!");
}

app.get('/', helloworld);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});