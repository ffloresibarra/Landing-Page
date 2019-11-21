const express = require('express');
const app = new express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, err  => {
    if (err)
        console.error(err);
    
    console.log(`The server is running on port: ${port}`);
});