'use strict'

const signupData  = {
    title: 'Регистрация',
    info: 'Создайте новый аккаунт',
    inputs: [
        {
            type: 'email',
            class: 'input_email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            type: 'password',
            class: 'input_password',
            name: 'password',
            placeholder: 'Пароль'
        },
        {
            type: 'password',
            class: 'input_password',
            name: 'confirmPassword',
            placeholder: 'Подтвердите пароль'
        }
    ],
    buttontitle: 'Зарегистрироваться',
    pretext: 'Уже есть аккаунт?',
    anchortext: 'Войти'
};

const loginData = {
    title: 'Авторизация',
    info: 'Войдите в свой аккаунт',
    inputs: [
        {
            type: 'email',
            class: 'input_email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            type: 'password',
            class: 'input_password',
            name: 'password',
            placeholder: 'Пароль'
        }
    ],
    buttontitle: 'Войти',
    pretext: 'Нет аккаунта?',
    anchortext: 'Зарегистрироваться'
};

export function renderAuthTemplate(title, info, inputs, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, inputs, buttontitle, pretext, anchortext});
}

export function showLoginForm(data) {
    let overlay;
    let loginForm;
    if(document.getElementsByClassName('overlay')[0] === undefined){
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.getElementsByClassName('base')[0].appendChild(overlay);

        loginForm = document.createElement('div');
        loginForm.className = 'login_form';
        loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
        document.body.appendChild(loginForm);
        overlay.classList.add('active');
        loginForm.classList.add('active');
    } else {
        overlay = document.getElementsByClassName('overlay')[0];
        loginForm = document.getElementsByClassName('login_form')[0];
        overlay.classList.toggle('not_active');
        overlay.classList.toggle('active');
        loginForm.classList.toggle('not_active');
    }

    

    overlay.addEventListener('click', () => {
        overlay.classList.toggle('not_active');
        overlay.classList.toggle('active');
        loginForm.classList.toggle('not_active');
        loginForm.classList.toggle('active');
    }, {once: true});

    const registerLink = loginForm.getElementsByClassName('link')[0];
    changeForm(registerLink, data, loginForm);

    addSubmitClickListener(loginForm, data);
}

function addSubmitClickListener(loginForm, data) {
    const submitButton = loginForm.querySelector('.authorization_enter');
    submitButton.addEventListener('click', () => {
        const inputs = loginForm.querySelectorAll('input');
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        addSubmitClickListener(loginForm, data);

        if (data.inputs.length > 2) {
            registerUser(formData);
        } else {
            loginUser(formData);
        }
    }, {once: true});
}

function changeForm(registerLink, data, loginForm) {
    registerLink.addEventListener('click', () => {
        if (data.inputs.length > 2) {
            data = loginData;
            loginForm.getElementsByClassName('auth')[0].classList.remove('expand');
            loginForm.getElementsByClassName('features')[0].classList.remove('expand');
            setTimeout( () => {
                loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
                changeForm(loginForm.getElementsByClassName('link')[0], data, loginForm);
                addSubmitClickListener(loginForm, data);
            }, 220);
        } else {
            data = signupData;
            loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
            setTimeout( () => {
                loginForm.getElementsByClassName('auth')[0].classList.add('expand');
                loginForm.getElementsByClassName('features')[0].classList.add('expand');
            }, 10);
            changeForm(loginForm.getElementsByClassName('link')[0], data, loginForm);
            addSubmitClickListener(loginForm, data);
        }
    });
}

function registerUser(formData) {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Регистрация прошла успешно!');
            closeLoginForm();
            showLoginForm(loginData);
        } else {
            alert('Ошибка регистрации: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка регистрации');
    });
}

function loginUser(formData) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Успешная авторизация!');
            closeLoginForm();
            updateToLoggedIn(data.user);
            
            document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`; 
        } else {
            alert('Ошибка авторизации: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка авторизации');
    });
}

function updateToLoggedIn(user) {
    const header = document.querySelector('header');
    const loginButton = header.querySelector('.enter');
    if (loginButton) {
        loginButton.textContent = user.email;
        loginButton.classList.remove('enter');
        loginButton.classList.add('user-profile');
        loginButton.addEventListener('click', logoutUser);
    }
}

function closeLoginForm() {
    const overlay = document.querySelector('.overlay');
    const loginForm = document.querySelector('.login_form');
    
    if (overlay && loginForm) {
        overlay.classList.add('not_active');
        loginForm.classList.add('not_active');
    
        overlay.remove();
        loginForm.remove();
    }
}

function checkLoggedInStatus() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user') {
            try {
                const user = JSON.parse(decodeURIComponent(value));
                updateToLoggedIn(user);
                return;
            } catch (error) {
                console.error('Error parsing user cookie:', error);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', checkLoggedInStatus);

function logoutUser() {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const header = document.querySelector('header');
    const userProfileButton = header.querySelector('.user-profile');
    if (userProfileButton) {
        userProfileButton.textContent = 'Войти';
        userProfileButton.classList.remove('user-profile');
        userProfileButton.classList.add('enter');
    }
}