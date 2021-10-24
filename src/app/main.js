import { request } from "./api";
import { clearError } from "./utils";


/* Selectors */
const sunlight = document.querySelector('.sunlight');
const wateringcan = document.querySelector('.wateringcan');
const pets = document.querySelector('.pets');

/* Clear warnings */
sunlight.addEventListener("change", event => clearError(event));
wateringcan.addEventListener("change", event => clearError(event));
pets.addEventListener("change", event => clearError(event));

/* Last input is the submit handler */
pets.addEventListener("click", () => handleSubmit());


/**
 * Submit the data
 */
const handleSubmit = () => {

    const payload = {
        "sun": {
            "element": sunlight,
            "value": sunlight.value
        },
        "water": {
            "element": wateringcan,
            "value": wateringcan.value
        },
        "pets": {
            "element": pets,
            "value": pets.value.toLowerCase() === 'yes' ? 'true' : 'false'
        }
    }

    const values = Object.values(payload).filter(item => !item.value || item.value.toLowerCase().includes('select...'))

    if (values.length === 0) {

        request(payload)
            .then(resp => resp.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                alert('Something went wrong')
            })

    } else if (values.length > 0) {

        values.map(value => {
            value.element.classList.add('missing-value')
        })

        alert(`Todos os campos são necessários :)`)
    }
}
