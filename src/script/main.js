import Search from "./models/Search";
import Days from "./models/Days"

import * as searchViews from "./views/searchViews";
import * as searchDays from "./views/searchDays";
import {
    elements,
    selectors,
    renderLoader
} from "./models/base";

import {
    keys
} from "./apiKey";

const state = {};

const controlSearch = async() => {
    //get text from input
    const location = searchViews.getInput();
    //get apiKey
    const key = keys.api;
    if (location) {
        state.search = new Search(location, key);
        //clear the input
        searchViews.clearInput();
        try {
            // get data
            await state.search.getResults();
            state.search.renderName()
                // state.search.calcTime();
            searchViews.renderResult(state.search)
            searchViews.updateClock()
            console.log(state.search);
        } catch {
            console.error("error");
        }
    } else alert("put name");
};



//listen for clicking the value
elements.searchForm.addEventListener('submit', controlSearch)
elements.searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const btn = e.target.closest(selectors.searchBtn);
    if (btn) {
        controlSearch();

    }
});

const controlDays = async(id) => {
    const key = keys.api
    if (id) {
        if (!state.days) state.days = new Days(id, key)
        try {
            await state.days.getDays()
            state.days.getFiveDays()
            searchDays.clearList()
            searchDays.renderResults(state.days.fiveDays, id)
            searchDays.toggleDays(id)

        } catch {
            console.error('problem with displaying days')
        }

    }
}


elements.weatherList.addEventListener('click', e => {
    const id = e.target.closest(".weather__item").dataset.itemid
        // controlDays(id)
    if (e.target.matches(".weather__btn, .weather__btn *")) {
        searchViews.deleteItem(id)

    }


})





//edit each elemet
elements.editBtn.addEventListener('click', () => {
    const deleteContainers = document.querySelectorAll(".weather__delete");
    const dragDropContainers = document.querySelectorAll(".weather__drag");

    [...deleteContainers, ...dragDropContainers].forEach(container => {
        container.classList.toggle('container--active')
    });

})



// function setDate() {
//     const now = new Date();
//     console.log(now)
// }

// setInterval(
//     setDate, 1000
// )
// setDate()


// import {
//     get,
//     setData,
//     succesHandler,
//     getfiveDays,
//     weather
// } from "./promises.js";
// // from "./async.js"

// import {
//     apiKey
// } from "./apiKey"

// import {
//     failHandler
// } from "./messages.js";

// elements.searchForm.addEventListener("click", function() {
//     const location = "los+angeles,us";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
//     const fiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${apiKey}`;

//     get(url)
//         .then((result) => {

//             return succesHandler(result);

//         })
//         .then((result) => {
//             console.log(result);

//             return setData(result);
//         }).then(() => {
//             // console.log(weather);

//         })
//         .catch((reason) => failHandler(reason));

//     getfiveDays(fiveDays)
//         .then((result) => {
//             return succesHandler(result);
//         })
//         .then(result => {
//                 // console.log(result);

//                 const objc = result.list.filter((x, index) => {
//                         return index[0], index % 8 === 0
//                     })
//                     // console.log(objc);
//             }

//         )
//         .catch((reason) => failHandler(reason));

// });