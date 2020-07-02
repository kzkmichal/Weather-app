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
            controlDays(state.search.id)
            state.search.renderName()
                // state.search.calcTime();
            searchViews.renderResult(state.search)
            searchViews.updateClock()
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
    const key = keys.api;
    state.days = new Days(id, key)
    if (id) {
        try {
            await state.days.getDays()
            state.days.getFiveDays();
            searchDays.renderResults(state.days.fiveDays, state.days.icons, id)
        } catch {
            console.error('problem with creating control Day');
        }
    }
}

//show/ hide 5 days and delete
elements.weatherList.addEventListener('click', e => {
    const id = e.target.closest(".weather__item").dataset.itemid
    searchDays.toggleDays(id)
    if (e.target.matches(".weather__btn, .weather__btn *")) {
        searchViews.deleteItem(id)
    }

})


//edit each elemet
elements.editBtn.addEventListener('click', () => {
    editItems()
    const deleteContainers = document.querySelectorAll(".weather__delete");
    const dragDropContainers = document.querySelectorAll(".weather__drag");
    const temperatureSwitch = document.querySelector(".switch-field")
    temperatureSwitch.classList.toggle('isActive')
    const showDays = document.querySelectorAll(".weather__days");
    [...deleteContainers, ...dragDropContainers].forEach(container => {
        container.classList.toggle('container--active')
    });
    if (showDays) {
        showDays.forEach(el => searchDays.hideElement(el));
    }
})

const editItems = () => {
    if (!elements.weatherList.classList.contains('edit') && items.length != 0) {
        elements.weatherList.classList.add('edit')
    } else {
        elements.weatherList.classList.remove('edit')
    }
}