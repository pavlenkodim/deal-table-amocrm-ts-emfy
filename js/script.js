import axios from 'axios';
import Lead from "./mobules/lead";
import clearTable from "./mobules/cleartable";
import preloader from "./mobules/preloader";

const proxy = "https://thingproxy.freeboard.io/fetch/";

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFhYjY5Mzc4YTBkM2U5Yjg1YjJjZTNmNGNlN2UxNmNkYTBlMGFhZDczZDlhNDg5NzRjOTE1NTE1NTRjMjEyMTc3YTRjMzQ0NzYxYTUxMDBlIn0.eyJhdWQiOiJkZmQ2ODc5ZC1hMzZkLTQ4NmItYWRjMS03ZDNhYmUyNTkxZjkiLCJqdGkiOiIxYWI2OTM3OGEwZDNlOWI4NWIyY2UzZjRjZTdlMTZjZGEwZTBhYWQ3M2Q5YTQ4OTc0YzkxNTUxNTU0YzIxMjE3N2E0YzM0NDc2MWE1MTAwZSIsImlhdCI6MTcwOTk4NDE2NiwibmJmIjoxNzA5OTg0MTY2LCJleHAiOjE3MTQ1MjE2MDAsInN1YiI6IjEwNzY1MjgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjE0NDk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZWM5MTIxNjEtYjUzZi00ZmRjLWI3ZjYtYjgxMDZiZDIyZmVmIn0.m3o3576lu6EFPUkP75S__sJvMu3DsFqDjTO1GPY1J8GKOp2ZO2IUY5sKeRZ0Y80GvHvynstszi4XeuBOrvaiDHg0MZmsa7JwG3naWAROw7o1JTD5oQ6M_pOaXGajggh70NtL5SxVDrnA_urxcAwF74gRH6867hmYS44CWv2skBvT5T4QlAJUHJzYODLsk_LSZXbHdghgy-j7qYz5N8mqmA5uIghXMBPwHe-ZeRxOU651hoPCN7PRUGOcV3RuwRMx6J3yTS1rweqp6SHcYs04F7iEuCu0yTJ9WrTXsIXQ-UjVvjTXCeriskRBiKel77dWbUFvUY22FjiG_qQeyo3WIA"
window.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector('.main_table'),
          showSelector = document.querySelector('#select_show');

    showSelector.addEventListener('change', () => {
        if (showSelector.value === 'все') {
            getLeads(250);
        }
        getLeads(showSelector.value);
    });

    getLeads(showSelector.value);

    function getLeads (limit, page = 1) {
        axios.get(`${proxy}https://pavlenkodim.amocrm.ru/api/v4/leads`, {
            headers: {'Authorization':`Bearer ${accessToken}`},
            params: {
                limit: limit,
                page: page
            }
        })
        .then(response => {
            const leads = response.data._embedded.leads;
            clearTable(table);

            console.log(response.data);

            for (let i = 0; i < leads.length; i++) {
                let lead = new Lead(i, table, leads[i]);
                lead.render();
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function pageSerf (data) {
        const prev = document.querySelector('.page_prev'),
              next = document.querySelector('.page_next'),
              self = document.querySelector('.this_page');

        if(data._page === 1) {
            prev.classList = 'page_prev not_active';
        } else {
            prev.addEventListener('click', () => {
                axios.get(data._links)
            });
        }


    }

});