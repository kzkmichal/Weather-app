export const elements = {
    searchForm: document.querySelector('.search__field'),
    searchInput: document.querySelector('.search__field'),
    searchBtn: document.querySelector('.search__btn'),
    editBtn: document.querySelector('.header__btn'),
    weatherList: document.querySelector('.weather__list'),
    fiveDaysList: document.querySelectorAll('.days__list'),


}

export const selectors = {
    searchBtn: '.search__btn',

}


export const renderLoader = () => {
    alert('loading')
}
export const calcTemp = (temp) => {
    const kelvin = 273;
    const celcTemp = Math.floor(temp - kelvin);

    return celcTemp
}

export const calcFarAndCelc = (temp, unit) => {
    let formula;
    const temperature = parseInt(temp)
    if (unit == 'far') {
        formula = Math.floor((temperature * (9 / 5)) + 32)
    } else if (unit == 'celc') {
        formula = Math.floor((temperature - 32) * (5 / 9))
    }
    return formula
}

const inputs = document.querySelectorAll(`[name="switch"]`)
inputs.forEach(input =>
    input.addEventListener('change', () => {
            const temp = document.querySelectorAll(".weather__temp");
            const tempDays = document.querySelectorAll('.days__temp')
            let unit;
            if (input.value == 'yes') {
                console.log('hello')
                unit = 'celc'
            } else if (input.value === 'no') {
                console.log('no')
                unit = 'far'
            }
            [...temp, ...tempDays].forEach(el =>
                el.textContent = calcFarAndCelc(el.textContent, unit)

            )
        }

    )
)