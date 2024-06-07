import projectDisplay from './projectDisplay';
import clearSelected from './clearSelected';

function makeSingleProjectNameElement(project) {
    const projectList = document.querySelector('.projectList');
    const projectNameElement = document.createElement('li');
    const dueDateInputs = document.querySelectorAll('#dueDate');
    projectNameElement.classList.add('projectName');
    projectNameElement.textContent = project;
    projectNameElement.addEventListener('click', () => {
        projectDisplay(project);
        for (let i=0; i<dueDateInputs.length; i++) {
            dueDateInputs[i].disabled = false;
            dueDateInputs[i].max = '3024-01-01';
        }
        clearSelected();
        projectNameElement.classList.add('selected');
    });
    projectList.appendChild(projectNameElement);
}

export default makeSingleProjectNameElement;