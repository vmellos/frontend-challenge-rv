const baseUrl = "https://front-br-challenges.web.app/api/v2/green-thumb/"

/**
 * Request the data for api
 * @param {Object} payload of object
 * @returns {Promise} Promise
 */
export const request = (payload) => {

    const parameters = `?sun=${payload.sun.value}&water=${payload.water.value}&pets=${payload.pets.value}`

    return new Promise((resolve, reject) => {
        try {
            fetch(baseUrl.concat(parameters)).then(resolve)
        } catch (e) {
            reject()
        }
    })
}
