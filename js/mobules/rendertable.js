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

    addDOM().then(leadsEl => {
        leadsEl.forEach(item => {
            table.append(item);
        })
    })

    // for (let i = 0; i < leads.length; i++) {
    //     let lead = new Lead(table, leads[i]);
    //     lead.getResponsible(leads[i].responsible_user_id)
    //         .then(() => {
    //             let elRend = lead.render();
    //             table.append(elRend);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
    async function addDOM() {
        let elements = [];
        for (let item of leads) {
            let lead = new Lead(1, table, item);
            await lead.getResponsible(item.responsible_user_id)
                .then(async () => {
                    let elRend = lead.render();
                    await elements.push(elRend);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return await elements;
    }
}