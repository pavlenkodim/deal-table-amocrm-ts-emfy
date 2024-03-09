import axios from 'axios';

class Lead {
    constructor(counter, data) {
        this.counter = counter;
        this.data = data;
    }

    getCompanyName(id) {
        return id;
    }

    render() {
        const element = document.createElement('tr');
        element.classList = 'element';
        element.innerHTML = `
            <td>${this.counter}</td>
            <td>${this.data.id}</td>
            <td>${this.data.name}</td>
            <td>${this.data.price}</td>
            <td>${this.getCompanyName(this.data._embedded.companies[0])}</td>
            <td>${this}</td>`;

    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://pavlenkodim.amocrm.ru/api/v4/leads')
        .then(response => {
            console.log(response);
        })
});