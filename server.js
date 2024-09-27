'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(8008, () => {
    console.log(`Server is running at http://localhost:${8008}`)
})
