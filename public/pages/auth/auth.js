'use strict';

import { renderAuthForm } from "../../components/authForm/authForm";

class Auth {
    #overlay;
    #authWarpper;

    constructor() {
        this.#overlay = document.createElement('div');
        this.#overlay.classList.add('overlay');
        this.#authWarpper = document.createElement('div');
        this.#authWarpper.classList.add('auth_wrapper');
        this.#overlay.appendChild(this.#authWarpper);
    }

    render(){
        
    }

    #addListeners() {
        const submitButton = document.getElementsByClassName('authorization_enter')[0];
        const registerLink = document.getElementsByClassName('link')[0];

        /////DO
    }

    #renderTemplate() {

    }
}