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

const homeButton = document.querySelector('.home');
const todayButton = document.querySelector('.today');
const weekButton = document.querySelector('.week');

homeButton.addEventListener('click', () => {
    home();
});
