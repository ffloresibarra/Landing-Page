const express = require('express');
const app = new express();
const port = 3000;
const serviceRouter = require('./services/email.service');
const cors = require('cors');

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/send-mail', serviceRouter);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, err  => {
    if (err)
        console.error(err);
    
    console.log(`The server is running on port: ${port}`);
});