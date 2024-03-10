import clearTable from "./cleartable";
import pageSerf from "./pageserf";
import Lead from "./lead";

const table = document.querySelector('.main_table'),
      proxy = "https://thingproxy.freeboard.io/fetch/";

export default function renderTable(response) {
    const leads = response.data._embedded.leads;
    clearTable(table);

    console.log(response.data);
    pageSerf(response.data, proxy);

    for (let i = 0; i < leads.length; i++) {
        let lead = new Lead(i, table, leads[i]);
        lead.getResponsible(leads[i].responsible_user_id)
            .then(() => {
            lead.render();
        })
            .catch(error => {
            console.log(error);
        });
    }
}