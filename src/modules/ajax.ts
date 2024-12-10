'use strict';

import { BACKEND_BASE_URL } from '../constants/constants.ts';
import { ResponseError } from './ajaxTypes.ts';
import { informationStorage } from './informationStorage.ts';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';


class Ajax {
    baseURL: string;
    csrf: string | null = null;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getCSRF() {
        const response = await fetch(`${this.baseURL}/csrf-token`, {
            method: GET,
            credentials: 'include',
        });

        return response.headers.get('X-Csrf-Token');
    }

    async get<TResponse>(endpoint: string, headers = {}): Promise<TResponse & ResponseError> {
        type Response = TResponse & ResponseError;
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: GET,
                headers: {
                    'Content-type': 'application/json',
                    ...headers
                },
                credentials: 'include',
            });
            
            if(response.headers.get('x-authenticated') === 'false' && informationStorage.isAuth()) {
                informationStorage.changeToNotAuthenticated(response);
            }

            const object: Response = await this.#handleResponse(response);

            return object;
        } catch (error) {
            console.error('GET error:', error);
            return {error: error, code: 400} as Response;
        }
    }

    async post<TResponse, TRequest>(endpoint: string, data: TRequest, headers = {}): Promise<TResponse & ResponseError> {
        type Response = TResponse & ResponseError;
        try {
            if(endpoint !== '/login' && endpoint !== '/signup'){
                this.csrf = informationStorage.getCSRF();
            }

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: POST,
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token': this.csrf,
                    ...headers
                } as HeadersInit,
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const object: Response = await this.#handleResponse(response);

            return object;
        } catch (error) {
            console.error('POST error:', error);
            return {error: error, code: 400} as Response;
        }
    }

    async put<TResponse, TRequest>(endpoint: string, data: TRequest, headers = {}): Promise<TResponse & ResponseError> {
        type Response = TResponse & ResponseError;
        try {
            this.csrf = informationStorage.getCSRF();
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: PUT,
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token': this.csrf,
                    ...headers
                } as HeadersInit,
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const object: Response = await this.#handleResponse(response);

            return object;
        } catch (error) {
            console.error('PUT error:', error);
            return {error: error, code: 400} as Response;
        }
    }

    async delete<TResponse, TRequest>(endpoint: string, data: TRequest, headers = {}): Promise<TResponse & ResponseError> {
        type Response = TResponse & ResponseError;
        try {
            this.csrf = informationStorage.getCSRF();
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: DELETE,
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token': this.csrf,
                    ...headers
                } as HeadersInit,
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const object: Response = await this.#handleResponse(response);

            return object;
        } catch (error) {
            console.error('DELETE error:', error);
            return {error: error, code: 400} as Response;
        }
    }

    async imagePut<TResponse>(endpoint: string, data: FormData): Promise<TResponse & ResponseError> {
        type Response = TResponse & ResponseError;
        try {
            this.csrf = informationStorage.getCSRF();
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: PUT,
                headers: {
                    'X-CSRF-Token': this.csrf
                } as HeadersInit,
                credentials: 'include',
                body: data
            });

            const object: Response = await this.#handleResponse(response);

            return object;
        } catch (error) {
            console.error('PUT error:', error);
            return {error: error, code: 400} as Response;
        }
    }

    async #handleResponse(response: Response) {
        if(!response.ok) {
            return { code: 400 };
        }

        return response.json();
    }
}

export default new Ajax(BACKEND_BASE_URL);
