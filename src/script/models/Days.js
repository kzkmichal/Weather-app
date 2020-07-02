export default class Days {
    constructor(id, key) {
        this.id = id;
        this.key = key;
    }
    async getDays() {
        try {

            const url = `https://api.openweathermap.org/data/2.5/forecast/daily?id=${this.id}&cnt=6&appid=${this.key}`;
            const respone = await fetch(url)
            const result = await respone.json()
            this.result = result.list



        } catch (err) {
            console.error('problem with getting days API')
        }
    }
    getFiveDays() {
        const fiveDays = this.result.slice(1)
        this.fiveDays = fiveDays

        const fiveDaysIcons = fiveDays.map(day => [
            `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`, day.weather[0].main
        ])
        this.icons = fiveDaysIcons

    }


}