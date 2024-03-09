export default function clearTable (selector) { //TODO: Refactor this!!!
    selector.innerHTML = '<tr class="fields_header">\n' +
        '                    <td> </td>\n' +
        '                    <td>ID <a href="#" class="sort"><img src="images/arrow-down-3101.svg"></a></td>\n' +
        '                    <td>Название <a href="#" class="sort"><img src="images/arrow-down-3101.svg"></a></td>\n' +
        '                    <td>Сумма <a href="#" class="sort"><img src="images/arro-up-3100.svg"></a></td>\n' +
        '                    <td>Клиент <a href="#" class="sort"><img src="images/arrow-down-3101.svg"></a></td>\n' +
        '                    <td>Стадия <a href="#" class="sort"><img src="images/arrow-down-3101.svg"></a></td>\n' +
        '                </tr>';
}