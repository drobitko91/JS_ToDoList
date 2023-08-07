// находим элементы на стр (в html)

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')

// добавление задачи
form.addEventListener('submit', addTask);

// удаление задачи
tasksList.addEventListener('click', deleteTask);

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

// функции
function addTask (event) {
    // отменяем отправку формы (стр больше не перезагружается при нажатии на Add)
    event.preventDefault();

    // достаем тескт задачи из поля ввода
    const taskText = taskInput.value;
    
    // формируем разметку для нвой задачи
    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    // добовляем задачу на стр
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // ощчищаем полу ввода и возвращаем на него фокус
    taskInput.value = '';
    taskInput.focus();

    // проверка; если в списке задач более 1го элементаб скрывать блок с картинкой 
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    } 
}

function deleteTask (event) {
    //проверяем, что клик бфл по кнопке "удалить задачу"
    if (event.target.dataset.action === 'delete') {
        // console.log('delet!');

        const parentNode = event.target.closest('.list-group-item');
        parentNode.remove();
    }

    // проверка; если в списке задач более 1 элемент, показываем блок "список дел пуст" 
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    } 
}

function doneTask (event) {
    //    проверяем, что клик был по кнопке "задача выполнена"
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');

        console.log(taskTitle)
    }
}