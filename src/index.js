import * as css from './index.css';
import makeAddTaskButton from './functions/makeAddTaskButton';
import makeAddTaskDialog from './functions/makeAddTaskDialog';
import makeEditTaskDialog from './functions/makeEditTaskDialog';
import home from './functions/home';
import today from './functions/today';
import week from './functions/week';

// let newProjectName = prompt("What do you want to name your project?");

// let newProject = new Project(newProjectName);

// newProject.add(question());

// display();

// window.addEventListener('beforeunload', () => {
//     addToLocalStorage(newProject);
// });

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

for (let i=0; i<localStorage.length; i++) {
    const projectName = document.createElement('li');
    projectName.classList.add('projectName');
    projectName.textContent = localStorage.key(i);
    projectList.appendChild(projectName);
}

projectsElement.appendChild(projectList);

makeAddTaskDialog();
makeEditTaskDialog();
makeAddTaskButton();