import {Project, addToLocalStorage, ToDo} from './toDoList';
import makeToDoBox from './makeToDoBox';
import makeSingleProjectNameElement from './makeSingleProjectNameElement';

function makeAddTaskDialog() {
    const content = document.querySelector('.content');
    const addTaskDialog = document.createElement('dialog');
    addTaskDialog.classList.add('addTaskDialog');

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

    addTaskDialog.addEventListener('click', (event) => {
        let rect = addTaskDialog.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            addTaskDialog.close();
        }
    });

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let newTask = new ToDo(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, projectInput.value);
        submitNewTask(newTask);
        addTaskDialog.close();
    });

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
            makeSingleProjectNameElement(newToDo.project);
        }
    }
}

export default makeAddTaskDialog;