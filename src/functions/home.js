import {Project, display, question, addToLocalStorage, ToDo} from './toDoList';
import {format} from 'date-fns';

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

    const priorityInput = document.createElement('select');
    const lowPriority = document.createElement('option');
    const mediumPriority = document.createElement('option');
    const highPriority = document.createElement('option');

    const projectInput = document.createElement('input');
    const submitButton = document.createElement('button');

    const titleLabel = document.createElement('label');
    const descriptionLabel = document.createElement('label');
    const dueDateLabel = document.createElement('label');
    const priorityLabel = document.createElement('label');
    const projectLabel = document.createElement('label');

    titleInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('type', 'text');
    dueDateInput.setAttribute('type', 'date');
    projectInput.setAttribute('type', 'text');
    submitButton.setAttribute('type', 'submit');

    titleInput.setAttribute('id', 'title');
    descriptionInput.setAttribute('id', 'description');
    dueDateInput.setAttribute('id', 'dueDate');
    priorityInput.setAttribute('id', 'priority');
    projectInput.setAttribute('id', 'project');

    titleLabel.setAttribute('for', 'title');
    descriptionLabel.setAttribute('for', 'description');
    dueDateLabel.setAttribute('for', 'dueDate');
    priorityLabel.setAttribute('for', 'priority');
    projectLabel.setAttribute('for', 'project');

    titleLabel.textContent = 'Title';
    descriptionLabel.textContent ='Description';
    dueDateLabel.textContent = 'Due Date';
    priorityLabel.textContent = 'Priority';
    projectLabel.textContent = 'Project';
    submitButton.textContent = 'Submit';
    lowPriority.textContent = 'Low';
    mediumPriority.textContent = 'Medium';
    highPriority.textContent = 'High';

    lowPriority.setAttribute('value', 'Low');
    mediumPriority.setAttribute('value', 'Medium');
    highPriority.setAttribute('value', 'High');

    submitButton.classList.add('submitButton');

    titleInput.required = true;
    descriptionInput.required = true;
    dueDateInput.required = true;
    priorityInput.required = true;
    projectInput.required = true;

    priorityInput.appendChild(lowPriority);
    priorityInput.appendChild(mediumPriority);
    priorityInput.appendChild(highPriority);

    const labels = [titleLabel, descriptionLabel, dueDateLabel, priorityLabel, projectLabel];
    const inputs = [titleInput, descriptionInput, dueDateInput, priorityInput, projectInput];

    for (let i=0; i<labels.length; i++) {
        let group = document.createElement('div');
        group.appendChild(labels[i]);
        group.appendChild(inputs[i]);
        addTaskForm.appendChild(group);
    }

    addTaskForm.appendChild(submitButton);
    addTaskDialog.appendChild(addTaskForm);
    content.appendChild(addTaskDialog);

    const editTaskForm = document.createElement('form');
    const editTitleInput = document.createElement('input');
    const editDescriptionInput = document.createElement('input');
    const editDueDateInput = document.createElement('input');

    const editPriorityInput = document.createElement('select');
    const editLowPriority = document.createElement('option');
    const editMediumPriority = document.createElement('option');
    const editHighPriority = document.createElement('option');

    const editProjectInput = document.createElement('input');
    const confirmChangesButton = document.createElement('button');

    const editTitleLabel = document.createElement('label');
    const editDescriptionLabel = document.createElement('label');
    const editDueDateLabel = document.createElement('label');
    const editPriorityLabel = document.createElement('label');
    const editProjectLabel = document.createElement('label');

    editTitleInput.setAttribute('type', 'text');
    editDescriptionInput.setAttribute('type', 'text');
    editDueDateInput.setAttribute('type', 'date');
    editPriorityInput.setAttribute('type', 'text');
    editProjectInput.setAttribute('type', 'text');
    confirmChangesButton.setAttribute('type', 'submit');

    editTitleInput.setAttribute('id', 'title');
    editDescriptionInput.setAttribute('id', 'description');
    editDueDateInput.setAttribute('id', 'dueDate');
    editPriorityInput.setAttribute('id', 'priority');
    editProjectInput.setAttribute('id', 'project');

    editTitleLabel.setAttribute('for', 'title');
    editDescriptionLabel.setAttribute('for', 'description');
    editDueDateLabel.setAttribute('for', 'dueDate');
    editPriorityLabel.setAttribute('for', 'priority');
    editProjectLabel.setAttribute('for', 'project');

    editTitleLabel.textContent = 'Title';
    editDescriptionLabel.textContent = 'Description';
    editDueDateLabel.textContent = 'Due Date';
    editPriorityLabel.textContent = 'Priority';
    editProjectLabel.textContent = 'Project';
    confirmChangesButton.textContent = 'Confirm Changes';
    editLowPriority.textContent = 'Low';
    editMediumPriority.textContent = 'Medium';
    editHighPriority.textContent = 'High';

    editLowPriority.setAttribute('value', 'Low');
    editMediumPriority.setAttribute('value', 'Medium');
    editHighPriority.setAttribute('value', 'High');

    editTitleInput.required = true;
    editDescriptionInput.required = true;
    editDueDateInput.required = true;
    editPriorityInput.required = true;
    editProjectInput.required = true;

    editPriorityInput.appendChild(editLowPriority);
    editPriorityInput.appendChild(editMediumPriority);
    editPriorityInput.appendChild(editHighPriority);

    const editLabels = [editTitleLabel, editDescriptionLabel, editDueDateLabel, editPriorityLabel, editProjectLabel];
    const editInputs = [editTitleInput, editDescriptionInput, editDueDateInput, editPriorityInput, editProjectInput];

    for (let i=0; i<labels.length; i++) {
        let group = document.createElement('div');
        group.appendChild(editLabels[i]);
        group.appendChild(editInputs[i]);
        editTaskForm.appendChild(group);
    }

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

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let newTask = new ToDo(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, projectInput.value);
        submitNewTask(newTask);
        addTaskDialog.close();
    });
    
    confirmChangesButton.addEventListener('click', (e) => {
        e.preventDefault();
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
    const deleteElement = document.createElement('button');

    titleElement.textContent = ToDo.title;
    descriptionElement.textContent = ToDo.description;
    dueDateElement.textContent = format(new Date(ToDo.dueDate), 'MM/dd/yyyy');
    priorityElement.textContent = ToDo.priority;
    editElement.textContent = 'Edit';
    deleteElement.textContent = 'Delete';

    titleElement.classList.add('title');
    descriptionElement.classList.add('description');
    dueDateElement.classList.add('dueDate');
    priorityElement.classList.add('priority');
    statusElement.classList.add('statusElement');
    editElement.classList.add('editElement');
    deleteElement.classList.add('deleteElement');
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

    deleteElement.addEventListener('click', () => {
        const ToDoList = document.querySelector('.ToDoList');
        const boxes = ToDoList.childNodes;
        const currentBox = deleteElement.parentElement;
        console.log(currentBox.dataset.index);
        console.log(boxes.length);
        for (let i=currentBox.dataset.index; i<boxes.length; i++) {
            boxes[i].dataset.index = i-1;
        }
        deleteTask(box.dataset.project, box.dataset.index);
        currentBox.remove();
    });

    box.appendChild(statusElement);
    box.appendChild(titleElement);
    box.appendChild(descriptionElement);
    box.appendChild(dueDateElement);
    box.appendChild(priorityElement);
    box.appendChild(editElement);
    box.appendChild(deleteElement);

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

function editTask(task, currentProject, index) {
    let projectState = JSON.parse(localStorage.getItem(currentProject));
    projectState[index] = task;
    localStorage.setItem(currentProject, JSON.stringify(projectState));
}

function deleteTask(currentProject, index) {
    let changedProject = JSON.parse(localStorage.getItem(currentProject));
    if (changedProject.length === 1) {
        localStorage.removeItem(currentProject);
    }
    else {
        changedProject.splice(index, 1);
        localStorage.setItem(currentProject, JSON.stringify(changedProject));
    }
}

export default home;