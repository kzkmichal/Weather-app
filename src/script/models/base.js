export const elements = {
    searchForm: document.querySelector('.search__field'),
    searchInput: document.querySelector('.search__field'),
    searchBtn: document.querySelector('.search__btn'),
    editBtn: document.querySelector('.header__btn'),
    weatherList: document.querySelector('.weather__list'),
    fiveDaysList: document.querySelectorAll('.days__list')

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