'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, 'src')));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'index.html'));
});

const cards = [
    {
        title: 'rfhnj',
        price: '12$',
    },
    {
        title: 'mnoke',
        price: '32&',
    },
    {
        title: 'Карточка товара',
        price: '600$',
    },
    {
        title: 'Карточка товара',
        price: '600$',
    },
    {
        title: 'Карточка товара',
        price: '600$',
    },
    {
        title: 'Карточка товара',
        price: '600$',
    },
]

app.get('/api/cards', (req, res) => {
    res.send(JSON.stringify(cards))
})

app.listen(8008, () => {
    console.log(`Server is running at http://localhost:${8008}`)
})
