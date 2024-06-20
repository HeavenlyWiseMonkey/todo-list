import * as css from './index.css';
import makeAddTaskButton from './functions/makeAddTaskButton';
import makeAddTaskDialog from './functions/makeAddTaskDialog';
import makeEditTaskDialog from './functions/makeEditTaskDialog';
import home from './functions/home';
import today from './functions/today';
import week from './functions/week';
import projectDisplay from './functions/projectDisplay';
import clearSelected from './functions/clearSelected';
import {format} from 'date-fns'

const homeElement = document.querySelector('.home');
const todayElement = document.querySelector('.today');
const weekElement = document.querySelector('.week');
const projectsElement = document.querySelector('.projects');

homeElement.addEventListener('click', () => {
    home();
});

todayElement.addEventListener('click', () => {
    today();
});

weekElement.addEventListener('click', () => {
    week();
});

const projectList = document.createElement('ul');
projectList.classList.add('projectList');

makeAddTaskDialog();
makeEditTaskDialog();
makeAddTaskButton();

const dueDateInputs = document.querySelectorAll('#dueDate');

for (let i=0; i<localStorage.length; i++) {
    const project = JSON.parse(localStorage.getItem(localStorage.key(i)));
    try {
        if (project[0].title) {
            const projectNameElement = document.createElement('li');
            const projectName = localStorage.key(i);
            projectNameElement.classList.add('projectName');
            projectNameElement.textContent = projectName;
            projectList.appendChild(projectNameElement);

            projectNameElement.addEventListener('click', () => {
                projectDisplay(projectName);
                for (let i=0; i<dueDateInputs.length; i++) {
                    dueDateInputs[i].disabled = false;
                    dueDateInputs[i].max = '3024-01-01';
                }
                clearSelected();
                projectNameElement.classList.add('selected');
            });
        }
    }
    catch(error) {
        console.log(error);
    }
}

projectsElement.appendChild(projectList);

const currentStringDate = format(new Date(), 'yyyy-MM-dd');
for (let i=0; i<dueDateInputs.length; i++) {
    dueDateInputs[i].min = currentStringDate;
}

home();