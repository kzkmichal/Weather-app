import {
    elements,
    calcTemp
} from "../models/base"



//get text from input
export const getInput = () => elements.searchInput.value;

//clear input

export const clearInput = () => elements.searchInput.value = '';

//render results
export const renderResult = (search) => {
    const {
        name,
        id,
        country,
        temperature,
        weather,
        timezone,
        stringName,
    } = search

    const markup = `
      <li class="weather__item" data-itemid="${id}">
             <div class="weather__actual">
            <div class="weather__delete">
      <button class="weather__btn btn"><span>&#8211;</span></button>
                    </div>
                    <div class="weather__col">
                        <div class="weather__time ${stringName}">${setTime(timezone)}</div>
                        <div class="weather__location">
                            <div class="weather__city">${name}</div>
                            <span>&#160;</span>
                            <div class="weather__country">${country}</div>
                        </div>
                    </div>

                    <div class="weather__icon">${weather.description}</div>
                    <div class="weather__temp">${calcTemp(temperature)}<span>&#176;</span></div>
                    <div class="weather__drag">
                        <span class="material-icons weather__drag-icon">
                menu
              </span></div></div>
                 <div class="weather__days days" data-dayid="${id}"><ul class="days__list"></ul></div>
                </li>`


    document.querySelector(".weather__list").insertAdjacentHTML('beforeend', markup)


    setInterval(() => {
        document.querySelector(`.${stringName}`).textContent = setTime(timezone)
    }, 1000)

    // setTime(timezone)

}


// calct time dependly of timezone
const setTime = (val) => {
    const offset = val / 3600
    const date = new Date()
    const localTime = date.getTime()
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const locationDateTime = utc + (3600000 * offset);
    const convertedDateTime = new Date(locationDateTime);
    return calcClock(convertedDateTime)
};
const calcClock = (date) => {
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds();
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    const time = `${h}:${m}:${s}`

    return time
}


export const deleteItem = (id) => {
    const item = document.querySelector(`[data-itemid="${id}"]`)
    if (item) return item.parentElement.removeChild(item)
    renderResult()

}

export const updateClock = () => {
    const time = document.querySelectorAll('.weather__time')
    console.log(time);

}





// function updateClocks() {
//     for (let clock of clocks) {
//         let timezone = clock.dataset.timezone;
//         let time = new Date().toLocaleTimeString("en-US", {
//             hour: '2-digit',
//             minute: '2-digit',
//             timeZone: timezone
//         });
//         clock.textContent = time;
//     }
// }

// // Update every minute:
// setInterval(updateClocks, 60000);
// updateClocks();