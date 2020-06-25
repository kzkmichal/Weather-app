import {
    elements,
    calcTemp
} from "../models/base"


//clear 5 days list
export const clearList = () => {
    document.querySelectorAll('.days__list').forEach(list => list.innerHTML = "")

};



// redner results for each day
const renderResult = (result, id) => {
    const {
        clouds,
        dt,
        temp: {
            max,
            min
        }
    } = result

    const markup = `
    <li class="days__item">
            <div class="days__weekday">${getDay(dt)}</div>
            <div class="days__sky">
                <div class="days__icon">${result.weather[0].icon}</div>
                <div class="days__probability">${clouds}</div>
            </div>

            <div class="days__avtemp">
                <div class="days__maxtemp">${calcTemp(max)}</div>
                <div class="days__mintemp">${calcTemp(min)}</div>
            </div>
        </li>
    `
    document.querySelector(`[data-dayid="${id}"] .days__list`).insertAdjacentHTML('beforeend', markup)
}


//loop over all days from five days forecast
export const renderResults = (results, id) => {
    results.forEach(result => renderResult(result, id));
}

const getDay = (dt) => {
    const date = new Date(dt * 1000)
    return date.toLocaleDateString("EN", {
        weekday: 'long'
    });
}



//maake container visible  dependly of click
export const toggleDays = (id) => {
    const item = document.querySelector(`[data-dayid="${id}"]`)
    if (item.classList.contains('days-isVisible')) {
        hideElement(item)
    } else {
        showOneElement()
        showElement(item)
    }
}
const hideElement = (item) => {
    item.classList.remove('days-isVisible')
    item.style.maxHeight = 0;

}
const showElement = (item) => {
    item.classList.add('days-isVisible')
    item.style.maxHeight = item.scrollHeight + "px";
}

const showOneElement = () => {
    const items = document.querySelectorAll(`.weather__days`);
    const currentItem = document.querySelector(`.days-isVisible`);
    items.forEach(item => {
            if (currentItem && currentItem !== item) {
                hideElement(currentItem)


            }

        }

    );
}