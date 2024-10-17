'use strict';

const GET = 'GET';
const POST = 'POST';

/**
 * Represents an Ajax client for making HTTP requests.
 */
export class Ajax {

    /**
     * Creates an instance of the Ajax client with a specified base URL.
     *
     * @param {string} baseURL - The base URL for all requests made by this client.
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Makes a GET request to the specified endpoint.
     *
     * @param {string} endpoint - The endpoint to which the GET request is made.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise<Object>} The response data parsed as JSON, or an error object if the request fails.
     */
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
        }
    }

    /**
     * Makes a POST request to the specified endpoint with the given data.
     *
     * @param {string} endpoint - The endpoint to which the POST request is made.
     * @param {Object} data - The data to send in the body of the POST request.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise<Object>} The response data parsed as JSON, or an error object if the request fails.
     */
    async post(endpoint, data, headers = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: POST,
                headers: {
                    'Content-type': 'application/json',
                    ...headers
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            return await this.#handleResponse(response);
        } catch (error) {
            console.error('POST error:', error);
        }
    }

    /**
     * Handles the HTTP response by checking its status and parsing it as JSON.
     *
     * @param {Response} response - The response object from the fetch call.
     * @returns {Promise<Object>} The parsed JSON data if the response is OK, or an error object.
     * @private
     */
    async #handleResponse(response) {
        if(!response.ok) {
            return { code: 400 };
        }

        return response.json();
    }
}
