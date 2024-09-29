'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../src', 'index.html'));
});

app.post('/api/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).send(JSON.stringify({ message: 'Все поля обязательны.' }));
    }

    if (password !== confirmPassword) {
        return res.status(400).send(JSON.stringify({ message: 'Пароли не совпадают.' }));
    }

    res.send(JSON.stringify({ message: 'Регистрация прошла успешно.', success: 1 }));

})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send(JSON.stringify({ message: 'Все поля обязательны.' }));
    }

    const user = { email };
    res.send(JSON.stringify({ user }));
})

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
