import * as css from './index.css';
import {Project, display, question, addToLocalStorage} from './functions/toDoList';
import home from './functions/home';

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

const projectList = document.createElement('ul');

for (let i=0; i<localStorage.length; i++) {
    const projectName = document.createElement('li');
    projectName.classList.add('projectName');
    projectName.textContent = localStorage.key(i);
    projectList.appendChild(projectName);
}

projectsElement.appendChild(projectList);