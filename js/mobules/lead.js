import axios from "axios";
const proxy = 'https://thingproxy.freeboard.io/fetch/';
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFhYjY5Mzc4YTBkM2U5Yjg1YjJjZTNmNGNlN2UxNmNkYTBlMGFhZDczZDlhNDg5NzRjOTE1NTE1NTRjMjEyMTc3YTRjMzQ0NzYxYTUxMDBlIn0.eyJhdWQiOiJkZmQ2ODc5ZC1hMzZkLTQ4NmItYWRjMS03ZDNhYmUyNTkxZjkiLCJqdGkiOiIxYWI2OTM3OGEwZDNlOWI4NWIyY2UzZjRjZTdlMTZjZGEwZTBhYWQ3M2Q5YTQ4OTc0YzkxNTUxNTU0YzIxMjE3N2E0YzM0NDc2MWE1MTAwZSIsImlhdCI6MTcwOTk4NDE2NiwibmJmIjoxNzA5OTg0MTY2LCJleHAiOjE3MTQ1MjE2MDAsInN1YiI6IjEwNzY1MjgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjE0NDk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZWM5MTIxNjEtYjUzZi00ZmRjLWI3ZjYtYjgxMDZiZDIyZmVmIn0.m3o3576lu6EFPUkP75S__sJvMu3DsFqDjTO1GPY1J8GKOp2ZO2IUY5sKeRZ0Y80GvHvynstszi4XeuBOrvaiDHg0MZmsa7JwG3naWAROw7o1JTD5oQ6M_pOaXGajggh70NtL5SxVDrnA_urxcAwF74gRH6867hmYS44CWv2skBvT5T4QlAJUHJzYODLsk_LSZXbHdghgy-j7qYz5N8mqmA5uIghXMBPwHe-ZeRxOU651hoPCN7PRUGOcV3RuwRMx6J3yTS1rweqp6SHcYs04F7iEuCu0yTJ9WrTXsIXQ-UjVvjTXCeriskRBiKel77dWbUFvUY22FjiG_qQeyo3WIA"


export default class Lead {
    lead;
    responsibleName = '';
    dateAdd = 'today';
    dateMod = 'tomorrow';
    constructor(counter,selector, data) {
        this.counter = counter; // TODO: Make something to counter!! Not used now.
        this.selector = selector;
        this.data = data;
    }

    getDates (create, update) {
        this.dateAdd = this.fromUNIXtoDate(create);
        this.dateMod = this.fromUNIXtoDate(update);
    }

    fromUNIXtoDate(unix) {
        const date = new Date(unix * 1000),
              year = date.getFullYear(),
              month = "0" + date.getMonth(),
              day = "0" + date.getDate(),
              hours = date.getHours(),
              minutes = "0" + date.getMinutes(),
              seconds = "0" + date.getSeconds();

        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} ${day.substr(-2)}.${month.substr(-2)}.${year}`;
    }

    async getResponsible(id) {
        await axios.get(`${proxy}https://pavlenkodim.amocrm.ru/api/v4/users/${id}`, {headers: {'Authorization':`Bearer ${accessToken}`}})
            .then(response => {
                this.responsibleName = response.data.name;
            })
            .catch(error => {
                console.error(error);
            });
        return this.responsibleName;
    }

    render() {
        this.getDates(this.data.created_at, this.data.updated_at);
        const element = document.createElement('tr');
        element.classList = 'element';
        element.innerHTML = `
            <td></td>
            <td>${this.data.id}</td>
            <td>${this.data.name}</td>
            <td>${this.data.price}</td>
            <td>${this.dateAdd}</td>
            <td>${this.dateMod}</td>
            <td>${this.responsibleName}</td>`;
        return element;
    }
}