import Pet from '../assets/images/icons/pet.svg'
import Toxic from '../assets/images/icons/toxic.svg'
import NoSun from '../assets/images/icons/no-sun.svg'
import LowSun from '../assets/images/icons/low-sun.svg'
import Drops3 from '../assets/images/icons/drops3.svg'
import Drops2 from '../assets/images/icons/drops2.svg'
import Drops1 from '../assets/images/icons/drops1.svg'

import { request } from "./api";
import { clearError } from "./utils";

const ICONS = {
    "low": LowSun,
    "no": NoSun,
    "high": LowSun,
    "rarely": Drops1,
    "daily": Drops2,
    "regularly": Drops3,
    "yes": Pet,
    "no": Toxic,
}

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
                let elem = document.querySelector('.cards');
                let placeholder = document.querySelector('.no-data');
                let top = document.querySelector('.btn');
                let products = document.querySelector('.product');
                top.style.display = 'flex'
                products.style.display = 'block'
                placeholder.style.display = 'none'

                elem.innerHTML = ''

                response.map(card => {
                        
                        if (card.staff_favorite) {
                            elem.innerHTML += `
                            <div class="list" id="${card.id}">
                                <div class="favorite"></div>
                                <div class="image"><img src="${card.url}" alt="Product ${card.name}"></div>
                                <div class="name">${card.name}</div>
                                <div class="details">
                                <div class="price">$${card.price}</div>
                                <div class="info"></div>
                                </div>
                            </div>
                            `
                        } else {

                        elem.innerHTML += `
                            <div class="list" id="${card.id}">
                                <div class="list__image"><img src="${card.url}" alt="Product ${card.name}"></div>
                                <div class="list__name">${card.name}</div>
                                <div class="list__details">
                                <div class="list__price">$${card.price}</div>
                                <div class="list__info">
                                <div class="icons"><img src="${ICONS[card.sun]}" alt="Icon"></div>
                                <div class="icons"><img src="${ICONS[card.water]}" alt="Icon"></div>
                                <div class="icons"><img src="${ICONS[card.toxicity ? "no" : "yes"]}" alt="Icon"></div>
                                </div>
                                </div>
                            </div>
                        `
                    }
                })
            })
            .catch(err => {
                console.log(err)
                alert('Something went wrong')
            })

    } else if (values.length > 0) {

        values.map(value => {
            value.element.classList.add('missing-value')
        })
        alert(`Todos os campos são necessários :)`)
    }
}
