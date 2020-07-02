import {
    elements,
    calcTemp
} from "../models/base"


//clear 5 days list
export const clearList = () => {
    document.querySelectorAll('.days__list').forEach(list => list.innerHTML = "")

};



// redner results for each day
const renderResult = (result, icons, id) => {
    const {
        clouds,
        dt,
        temp: {
            max,
            min
        }
    } = result
    // console.log(result);
    const icon = icons[0]
    const main = icons[1]

    const markup = `
    <li class="days__item">
            <div class="days__weekday">${getDay(dt)}</div>
            <div class="days__sky">
                    <figure  class="days__icon">
                    <img class="icon" src=${icon} alt=${main}>
                </figure>
                <div class="days__probability">${clouds}%</div>
            </div>

            <div class="days__avtemp">
                <div class="days__temp days__maxtemp">${calcTemp(max)}</div>
                <div class="days__temp days__mintemp">${calcTemp(min)}</div>
            </div>
        </li>
    `
    document.querySelector(`[data-dayid="${id}"] .days__list`).insertAdjacentHTML('beforeend', markup)
}


//loop over all days from five days forecast
export const renderResults = (results, icons, id) => {
    results.forEach((result, index) => renderResult(result, icons[index], id));
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
export const hideElement = (item) => {
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