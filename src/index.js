import {Project, display, question, addToLocalStorage} from './toDoList';

let newProjectName = prompt("What do you want to name your project?");

let newProject = new Project(newProjectName);

newProject.add(question());

display();

window.addEventListener('beforeunload', () => {
    addToLocalStorage(newProject);
});