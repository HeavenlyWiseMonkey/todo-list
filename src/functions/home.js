import {Project, display, question, addToLocalStorage, ToDo} from './toDoList';
const content = document.querySelector('.content');

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.addEventListener('click', () => {
    localStorage.clear();
});

content.appendChild(clearButton);

function home() {
    content.textContent = '';
    const ToDoList = document.createElement('div');
    ToDoList.classList.add('ToDoList');
    content.appendChild(ToDoList);
    // Show localStorage toDos
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                makeToDoBox(obj[i], i);
            }
        }
    }

    // Make dialog and inputs
    const addTaskDialog = document.createElement('dialog');
    const editTaskDialog = document.createElement('dialog');

    addTaskDialog.classList.add('addTaskDialog');
    editTaskDialog.classList.add('editTaskDialog');

    const addTaskForm = document.createElement('form');
    const titleInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const dueDateInput = document.createElement('input');
    const priorityInput = document.createElement('input');
    const projectInput = document.createElement('input');
    const submitButton = document.createElement('button');


    titleInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('type', 'text');
    dueDateInput.setAttribute('type', 'text');
    priorityInput.setAttribute('type', 'text');
    projectInput.setAttribute('type', 'input');
    submitButton.setAttribute('type', 'button');

    titleInput.setAttribute('placeholder', 'Title');
    descriptionInput.setAttribute('placeholder', 'Description');
    dueDateInput.setAttribute('placeholder', 'Due Date');
    priorityInput.setAttribute('placeholder', 'Priority');
    projectInput.setAttribute('placeholder', 'Project');
    submitButton.classList.add('submitButton');
    submitButton.textContent = 'Submit';

    addTaskForm.appendChild(titleInput);
    addTaskForm.appendChild(descriptionInput);
    addTaskForm.appendChild(dueDateInput);
    addTaskForm.appendChild(priorityInput);
    addTaskForm.appendChild(projectInput);
    addTaskForm.appendChild(submitButton);
    addTaskDialog.appendChild(addTaskForm);
    content.appendChild(addTaskDialog);

    const editTaskForm = document.createElement('form');
    const editTitleInput = document.createElement('input');
    const editDescriptionInput = document.createElement('input');
    const editDueDateInput = document.createElement('input');
    const editPriorityInput = document.createElement('input');
    const editProjectInput = document.createElement('input');
    const confirmChangesButton = document.createElement('button');

    editTitleInput.setAttribute('type', 'text');
    editDescriptionInput.setAttribute('type', 'text');
    editDueDateInput.setAttribute('type', 'text');
    editPriorityInput.setAttribute('type', 'text');
    editProjectInput.setAttribute('type', 'text');
    confirmChangesButton.setAttribute('type', 'button');

    editTitleInput.setAttribute('placeholder', 'Title');
    editDescriptionInput.setAttribute('placeholder', 'Description');
    editDueDateInput.setAttribute('placeholder', 'Due Date');
    editPriorityInput.setAttribute('placeholder', 'Priority');
    editProjectInput.setAttribute('placeholder', 'Project');
    confirmChangesButton.textContent = 'Confirm Changes';

    editTaskForm.appendChild(editTitleInput);
    editTaskForm.appendChild(editDescriptionInput);
    editTaskForm.appendChild(editDueDateInput);
    editTaskForm.appendChild(editPriorityInput);
    editTaskForm.appendChild(editProjectInput);
    editTaskForm.appendChild(confirmChangesButton);
    editTaskDialog.appendChild(editTaskForm);

    content.appendChild(editTaskDialog);

    // Add Event Listeners
    addTaskDialog.addEventListener('click', (event) => {
        let rect = addTaskDialog.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            addTaskDialog.close();
        }
    });

    editTaskDialog.addEventListener('click', (event) => {
        let rect = editTaskDialog.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            editTaskDialog.close();
        }
    });

    submitButton.addEventListener('click', () => {
        let newTask = new ToDo(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, projectInput.value);
        submitNewTask(newTask);
        addTaskDialog.close();
    });
    
    confirmChangesButton.addEventListener('click', () => {
        let editedTask = new ToDo(editTitleInput.value, editDescriptionInput.value, editDueDateInput.value, editPriorityInput.value, editProjectInput.value);
        let values = Object.values(editedTask);
        let box = document.querySelector(`[data-project='${editTaskForm.dataset.project}'][data-index='${editTaskForm.dataset.index}']`);
        let editInputs = box.childNodes;
        editTask(editedTask, editTaskForm.dataset.project, editTaskForm.dataset.index);
        for (let i=1; i<editInputs.length-1; i++) {
            editInputs[i].textContent = values[i-1];
        }
        editTaskDialog.close();
    });

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+ Add Task'
    addTaskButton.addEventListener('click', () => {
        addTaskDialog.showModal();
    });
    content.appendChild(addTaskButton);
}

function makeToDoBox(ToDo, index) {
    const ToDoList = document.querySelector('.ToDoList');
    const box = document.createElement('div');
    const titleElement = document.createElement('p');
    const descriptionElement = document.createElement('p');
    const dueDateElement = document.createElement('p');
    const priorityElement = document.createElement('p');
    const statusElement = document.createElement('input');
    const editElement = document.createElement('button');

    titleElement.textContent = ToDo.title;
    descriptionElement.textContent = ToDo.description;
    dueDateElement.textContent = ToDo.dueDate;
    priorityElement.textContent = ToDo.priority;
    editElement.textContent = 'Edit';

    titleElement.classList.add('title');
    descriptionElement.classList.add('description');
    dueDateElement.classList.add('dueDate');
    priorityElement.classList.add('priority');
    statusElement.classList.add('statusElement');
    editElement.classList.add('editElement');
    box.classList.add('toDoBox');

    statusElement.type = 'checkbox';

    box.setAttribute('data-project', ToDo.project);
    box.setAttribute('data-index', index);

    editElement.addEventListener('click', () => {
        const editTaskDialog = document.querySelector('.editTaskDialog');
        const form = editTaskDialog.childNodes[0];
        const editTaskInputs = form.childNodes;
        const box = editElement.parentElement;
        const project = JSON.parse(localStorage.getItem(box.dataset.project));
        const attributes = Object.values(project[box.dataset.index]);
        form.setAttribute('data-project', box.dataset.project);
        form.setAttribute('data-index', box.dataset.index);
        for (let i=0; i<editTaskInputs.length; i++) {
            editTaskInputs[i].value = attributes[i];
        }
        editTaskDialog.showModal();
    });

    box.appendChild(statusElement);
    box.appendChild(titleElement);
    box.appendChild(descriptionElement);
    box.appendChild(dueDateElement);
    box.appendChild(priorityElement);
    box.appendChild(editElement);

    ToDoList.appendChild(box);
}

function submitNewTask(newToDo) {
    if (newToDo.project in localStorage) {
        let localProject = JSON.parse(localStorage.getItem(newToDo.project));
        localProject.push(newToDo);
        localStorage.setItem(newToDo.project, JSON.stringify(localProject));
        makeToDoBox(newToDo, localProject.length-1);
    }
    else {
        let newProject = new Project(newToDo.project);
        newProject.add(newToDo);
        addToLocalStorage(newProject);
        makeToDoBox(newToDo, 0);
    }
}

function editTask(editedTask, currentProject, index) {
    let projectState = JSON.parse(localStorage.getItem(currentProject));
    projectState[index] = editedTask;
    localStorage.setItem(currentProject, JSON.stringify(projectState));
}

export default home;