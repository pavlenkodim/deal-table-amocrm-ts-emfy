import axios from "axios";
import renderTable from "./rendertable";

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFhYjY5Mzc4YTBkM2U5Yjg1YjJjZTNmNGNlN2UxNmNkYTBlMGFhZDczZDlhNDg5NzRjOTE1NTE1NTRjMjEyMTc3YTRjMzQ0NzYxYTUxMDBlIn0.eyJhdWQiOiJkZmQ2ODc5ZC1hMzZkLTQ4NmItYWRjMS03ZDNhYmUyNTkxZjkiLCJqdGkiOiIxYWI2OTM3OGEwZDNlOWI4NWIyY2UzZjRjZTdlMTZjZGEwZTBhYWQ3M2Q5YTQ4OTc0YzkxNTUxNTU0YzIxMjE3N2E0YzM0NDc2MWE1MTAwZSIsImlhdCI6MTcwOTk4NDE2NiwibmJmIjoxNzA5OTg0MTY2LCJleHAiOjE3MTQ1MjE2MDAsInN1YiI6IjEwNzY1MjgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjE0NDk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZWM5MTIxNjEtYjUzZi00ZmRjLWI3ZjYtYjgxMDZiZDIyZmVmIn0.m3o3576lu6EFPUkP75S__sJvMu3DsFqDjTO1GPY1J8GKOp2ZO2IUY5sKeRZ0Y80GvHvynstszi4XeuBOrvaiDHg0MZmsa7JwG3naWAROw7o1JTD5oQ6M_pOaXGajggh70NtL5SxVDrnA_urxcAwF74gRH6867hmYS44CWv2skBvT5T4QlAJUHJzYODLsk_LSZXbHdghgy-j7qYz5N8mqmA5uIghXMBPwHe-ZeRxOU651hoPCN7PRUGOcV3RuwRMx6J3yTS1rweqp6SHcYs04F7iEuCu0yTJ9WrTXsIXQ-UjVvjTXCeriskRBiKel77dWbUFvUY22FjiG_qQeyo3WIA";

export default function pageSerf (data, proxy) { // TODO: Refactor this function!!!
    const selector = document.querySelector('.page_serf'),
        prev = document.createElement('button'),
        next = document.createElement('button'),
        first = document.createElement('button'),
        self = document.createElement('button');

    prev.textContent = '<';
    first.textContent = '1';
    self.textContent = data._page;
    next.textContent = '>';

    selector.innerHTML = '';

    if (data._links.prev) {
        selector.append(prev);
        prev.addEventListener('click', event => {
            event.preventDefault();
            getPage(proxy, data, 'prev');
        });
    }

    if (data._links.first) {
        selector.append(first);
        first.addEventListener('click', event => {
            event.preventDefault();
            getPage(proxy, data, 'first');
        });
    }

    if (data._links.self) {
        selector.append(self);
        self.addEventListener('click', event => {
            event.preventDefault();
            // getPage(proxy, data, 'self');
        });
    }

    if (data._links.next) {
        selector.append(next);
        next.addEventListener('click', event => {
            event.preventDefault();
            getPage(proxy, data, 'next');
        });
    }
    function getPage(proxy, data, method) {
        axios.get(`${proxy}${data._links[method].href}`, {headers: {'Authorization':`Bearer ${accessToken}`}})
            .then(renderTable)
            .catch(error => {
                console.error(error);
            })
    }
}