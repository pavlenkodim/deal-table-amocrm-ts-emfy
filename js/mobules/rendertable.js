import clearTable from "./cleartable";
import pageSerf from "./pageserf";
import Lead from "./lead";
import sort from "./sort";

const table = document.querySelector('.main_table'),
      proxy = "https://thingproxy.freeboard.io/fetch/";

export default function renderTable(response, newLeads = null) {
    let leads = response.data._embedded.leads;
    clearTable(table);

    const sortSelector = document.querySelectorAll('.sort');
    sortSelector.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const method = item.getAttribute('name');
            const result = sort(leads, method);
            renderTable(response, result);
        });
    });

    console.log(response.data);
    pageSerf(response.data, proxy);

    if (newLeads) {
        leads = newLeads;
    }

    async function addDOM() {
        let element;
        for (let i = 0; i < leads.length; i++) {
            let lead = new Lead(i, table, leads[i]);
            lead.getResponsible(leads[i].responsible_user_id)
                .then(() => {
                    let elRend = lead.render();
                    element.push(elRend);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        return await element;
    }
}