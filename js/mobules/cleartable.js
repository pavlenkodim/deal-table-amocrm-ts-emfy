export default function clearTable (selector, disable = false) { //TODO: Refactor this
    if (disable) {
        return;
    }
    selector.innerHTML = `<tr class="fields_header">
                    <td> </td>
                    <td>ID <a href="#" name="id" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                    <td>Название <a href="#" name="name" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                    <td>Сумма <a href="#" name="price" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                    <td>Дата создания <a href="#" name="created_at" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                    <td>Дата изменения <a href="#" name="updated_at" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                    <td>Ответственный <a href="#" name="responsible_user_id" class="sort"><img src="images/arrow-down-3101.svg"></a></td>
                </tr>`;
}