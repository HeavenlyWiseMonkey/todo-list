import {ToDo} from './toDoList';
import {format} from 'date-fns';

function makeEditTaskDialog() {
    const content = document.querySelector('.content');
    const editTaskDialog = document.createElement('dialog');


    editTaskDialog.classList.add('editTaskDialog');

    

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

    for (let i=0; i<editLabels.length; i++) {
        let group = document.createElement('div');
        group.appendChild(editLabels[i]);
        group.appendChild(editInputs[i]);
        editTaskForm.appendChild(group);
    }

    editTaskForm.appendChild(confirmChangesButton);
    editTaskDialog.appendChild(editTaskForm);

    content.appendChild(editTaskDialog);

    editTaskDialog.addEventListener('click', (event) => {
        let rect = editTaskDialog.getBoundingClientRect();
        let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            editTaskDialog.close();
        }
    });

    confirmChangesButton.addEventListener('click', (e) => {
        e.preventDefault();
        let editedTask = new ToDo(editTitleInput.value, editDescriptionInput.value, editDueDateInput.value, editPriorityInput.value, editProjectInput.value);
        let values = Object.values(editedTask);
        let box = document.querySelector(`[data-project='${editTaskForm.dataset.project}'][data-index='${editTaskForm.dataset.index}']`);
        let editInputs = box.childNodes;
        editTask(editedTask, editTaskForm.dataset.project, editTaskForm.dataset.index);
        for (let i=1; i<editInputs.length-2; i++) {
            editInputs[i].textContent = values[i-1];
            if (i === 3) {
                let dateData = values[i-1].split('-');
                editInputs[i].textContent = format(new Date(Number(dateData[0]), Number(dateData[1])-1, Number(dateData[2])), 'MM/dd/yyyy');
            }
        }
        editTaskDialog.close();
    });

    function editTask(task, currentProject, index) {
        let projectState = JSON.parse(localStorage.getItem(currentProject));
        projectState[index] = task;
        localStorage.setItem(currentProject, JSON.stringify(projectState));
    }
}

export default makeEditTaskDialog;