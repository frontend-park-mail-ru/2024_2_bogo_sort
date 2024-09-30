'use strict';


const cards = [
    { "id": 1, "title": "Аренда квартиры", "image_url": "/static/images/image60.jpg", "price": 1100, "location": "Санкт-Петербург" },
    { "id": 2, "title": "Продам ноутбук", "image_url": "/static/images/image51.jpg", "price": 1200, "location": "Новосибирск" },
    { "id": 3, "title": "Продам автомобиль", "image_url": "/static/images/image52.jpg", "price": 1300, "location": "Екатеринбург" },
    { "id": 4, "title": "Продам мебель", "image_url": "/static/images/image53.jpg", "price": 1400, "location": "Казань" },
    { "id": 5, "title": "Продам телефон", "image_url": "/static/images/image54.jpg", "price": 1500, "location": "Москва" },
    { "id": 6, "title": "Продам дом", "image_url": "/static/images/image55.jpg", "price": 1600, "location": "Санкт-Петербург" },
    { "id": 7, "title": "Аренда гаража", "image_url": "/static/images/image56.jpg", "price": 1700, "location": "Новосибирск" },
    { "id": 8, "title": "Продам планшет", "image_url": "/static/images/image57.jpg", "price": 1800, "location": "Екатеринбург" },
    { "id": 9, "title": "Продам телевизор", "image_url": "/static/images/image58.jpg", "price": 1900, "location": "Казань" },
    { "id": 10, "title": "Продам велосипед", "image_url": "/static/images/image59.jpg", "price": 2000, "location": "Москва" },
    { "id": 11, "title": "Аренда квартиры", "image_url": "/static/images/image11.jpg", "price": 2100, "location": "Санкт-Петербург" },
    { "id": 12, "title": "Продам ноутбук", "image_url": "/static/images/image12.jpg", "price": 2200, "location": "Новосибирск" },
    { "id": 13, "title": "Продам автомобиль", "image_url": "/static/images/image13.jpg", "price": 2300, "location": "Екатеринбург" },
    { "id": 14, "title": "Продам мебель", "image_url": "/static/images/image14.jpg", "price": 2400, "location": "Казань" },
    { "id": 15, "title": "Продам телефон", "image_url": "/static/images/image15.jpg", "price": 2500, "location": "Москва" },
    { "id": 16, "title": "Продам дом", "image_url": "/static/images/image16.jpg", "price": 2600, "location": "Санкт-Петербург" },
    { "id": 17, "title": "Аренда гаража", "image_url": "/static/images/image17.jpg", "price": 2700, "location": "Новосибирск" },
    { "id": 18, "title": "Продам планшет", "image_url": "/static/images/image18.jpg", "price": 2800, "location": "Екатеринбург" },
    { "id": 19, "title": "Продам телевизор", "image_url": "/static/images/image19.jpg", "price": 2900, "location": "Казань" },
    { "id": 20, "title": "Продам велосипед", "image_url": "/static/images/image20.jpg", "price": 3000, "location": "Москва" },
    { "id": 21, "title": "Аренда квартиры", "image_url": "/static/images/image21.jpg", "price": 3100, "location": "Санкт-Петербург" },
    { "id": 22, "title": "Продам ноутбук", "image_url": "/static/images/image22.jpg", "price": 3200, "location": "Новосибирск" },
    { "id": 23, "title": "Продам автомобиль", "image_url": "/static/images/image23.jpg", "price": 3300, "location": "Екатеринбург" },
    { "id": 24, "title": "Продам мебель", "image_url": "/static/images/image24.jpg", "price": 3400, "location": "Казань" },
    { "id": 25, "title": "Продам телефон", "image_url": "/static/images/image25.jpg", "price": 3500, "location": "Москва" }];

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
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


app.get('/api/cards', (req, res) => {
    res.send(JSON.stringify(cards))
})

app.listen(8008, () => {
    console.log(`Server is running at http://localhost:${8008}`)
})
