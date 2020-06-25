export default class Search {
    constructor(location, key) {
        this.location = location;
        this.key = key;
    }
    async getResults() {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&APPID=${this.key}`;
            const response = await fetch(url);
            const result = await response.json();
            this.name = result.name;
            this.id = result.id
            this.country = result.sys.country;
            this.temperature = result.main.temp;
            this.weather = result.weather[0];
            this.timezone = result.timezone
            console.log(result);

        } catch (err) {
            alert(err)
        }
    }
    renderName() {
        const name = this.name
        this.stringName = name.replace(/\s/g, '')

    }
}