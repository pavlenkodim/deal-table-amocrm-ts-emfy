export default class Lead {
    constructor(counter,selector, data) {
        this.counter = counter
        this.selector = selector;
        this.data = data;
    }

    getCompanyName(id) {
        return id;
    }

    render() {
        const element = document.createElement('tr');
        element.classList = 'element';
        element.innerHTML = `
            <td>${this.counter + 1}</td>
            <td>${this.data.id}</td>
            <td>${this.data.name}</td>
            <td>${this.data.price}</td>
            <td>${this.getCompanyName(this.data._embedded.companies[0])}</td>
            <td>${this}</td>`;
        this.selector.append(element);
    }
}