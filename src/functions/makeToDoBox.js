import {format} from 'date-fns';

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
    const dateData = ToDo.dueDate.split("-");

    titleElement.textContent = ToDo.title;
    descriptionElement.textContent = ToDo.description;
    dueDateElement.textContent = format(new Date(Number(dateData[0]), Number(dateData[1])-1, Number(dateData[2])), 'MM/dd/yyyy');
    priorityElement.textContent = ToDo.priority;
    editElement.textContent = 'Edit';
    deleteElement.textContent = 'Delete';

    statusElement.checked = ToDo.status;

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
        for (let i=0; i<editTaskInputs.length-1; i++) {
            editTaskInputs[i].childNodes[1].value = attributes[i];
        }
        editTaskDialog.showModal();
    });

    deleteElement.addEventListener('click', () => {
        const ToDoList = document.querySelector('.ToDoList');
        const boxes = ToDoList.childNodes;
        const currentBox = deleteElement.parentElement;
        for (let i=currentBox.dataset.index; i<boxes.length; i++) {
            boxes[i].dataset.index = i-1;
        }
        deleteTask(box.dataset.project, box.dataset.index);
        currentBox.remove();
    });
    statusElement.addEventListener('change' , () => {
        changeStatus(statusElement.checked, box.dataset.project, box.dataset.index);
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

function changeStatus(checkStatus, project, index) {
    let projectState = JSON.parse(localStorage.getItem(project));
    projectState[index].status = checkStatus;
    localStorage.setItem(project, JSON.stringify(projectState));
}

export default makeToDoBox;