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
    // Show localStorage toDos
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                const box = document.createElement('div');
                const titleElement = document.createElement('p');
                const descriptionElement = document.createElement('p');
                const dueDateElement = document.createElement('p');
                const priorityElement = document.createElement('p');

                titleElement.textContent = obj[i].title;
                descriptionElement.textContent = obj[i].description;
                dueDateElement.textContent = obj[i].dueDate;
                priorityElement.textContent = obj[i].priority;
                box.appendChild(titleElement);
                box.appendChild(descriptionElement);
                box.appendChild(dueDateElement);
                box.appendChild(priorityElement);
                box.classList.add('toDoBox');
                content.appendChild(box);
            }
        }
    }

    // Make dialog and inputs
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
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
    projectInput.setAttribute('placeholder', 'Project Name');
    submitButton.textContent = 'Submit';

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(priorityInput);
    form.appendChild(projectInput);
    form.appendChild(submitButton);
    dialog.appendChild(form);
    content.appendChild(dialog);

    // Add Event Listeners
    dialog.addEventListener('click', (event) => {
        let rect = dialog.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
        dialog.close();
        }
    });

    submitButton.addEventListener('click', () => {
        let nameOfProject = projectInput.value;
        let newToDo = new ToDo(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value)
        if (nameOfProject in localStorage) {
            let localProject = JSON.parse(localStorage.getItem(nameOfProject));
            localProject.push(newToDo);
            localStorage.setItem(nameOfProject, JSON.stringify(localProject));
        }
        else {
            let newProject = new Project(nameOfProject);
            newProject.add(newToDo);
            addToLocalStorage(newProject);
        }
        dialog.close();
    });

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+ Add Task'
    addTaskButton.addEventListener('click', () => {
        dialog.showModal();
    });
    content.appendChild(addTaskButton);
}

export default home;