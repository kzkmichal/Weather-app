export {
    get,
    succesHandler,
    setData,
    getfiveDays,
    weather

}
import {
    failHandler,
} from './messages.js'

const weather = {}


function get(url) {
    return new Promise((resolve, reject) => {
        const htmlRequest = new XMLHttpRequest();
        htmlRequest.open('GET', url);
        htmlRequest.onload = () => {
            if (htmlRequest.status == 200) {
                resolve(htmlRequest.responseText)
            } else
                reject(htmlRequest.statusText);
        }
        htmlRequest.send()
    })
}

const succesHandler = (data) => {
    return new Promise((resolve, reject) => {
        const newData = JSON.parse(data)
        resolve(newData)

    })

}
const setData = (response) => {
    weather.description = response.weather[0].description;
    weather.name = response.name;
    weather.temp = changeTemp(response.main.temp);
    weather.country = (response.sys.country);
}

const changeTemp = (temp) => {
    const kelvin = 273;
    return Math.floor(temp - kelvin)

}


function getfiveDays(fiveDays) {
    return new Promise((resolve, reject) => {
            const htmlRequest = new XMLHttpRequest;
            htmlRequest.open('Get', fiveDays)
            htmlRequest.onload = () => {
                if (htmlRequest.status == 200) {
                    resolve(htmlRequest.responseText)

                } else {
                    reject(htmlRequest.status)
                }
            }
            htmlRequest.send()
        }



    )

}