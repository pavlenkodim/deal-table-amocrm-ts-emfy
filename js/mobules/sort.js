export default function sort(leads, method) {
    return leads.sort(function (a, b) {
        if (a[method] > b[method]) {
            return 1;
        }
        if (a[method] < b[method]) {
            return -1;
        }
        return 0;
    });
}