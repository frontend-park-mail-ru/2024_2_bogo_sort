'use strict';

const GET = 'GET';
const POST = 'POST';

export class Ajax {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint, headers = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: GET,
                headers: {
                    'Content-type': 'application/json',
                    ...headers
                }
            });
            return await this.#handleResponse(response);
        } catch (error) {
            console.error('GET error:', error);
            alert(error);
        }
    }

    async post(endpoint, data, headers = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: POST,
                headers: {
                    'Content-type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data)
            });
            return await this.#handleResponse(response);
        } catch (error) {
            console.error('POST error:', error);
            alert(error);
        }
    }

    async #handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message);
            error.status = response.status;
            alert(error);
        }
        return response.json();
    }
}
