import makeToDoBox from './makeToDoBox';

function projectDisplay(projectName) {
    const ToDoList = document.querySelector('.ToDoList');
    ToDoList.textContent = '';
    let project = JSON.parse(localStorage.getItem(projectName));
    for (let i=0; i<project.length; i++) {
        makeToDoBox(project[i], [i]);
    }
    projectLock(projectName);
}

function projectLock(projectName) {
    const projectInputs = document.querySelectorAll('#project');
    for (let i=0; i<projectInputs.length; i++) {
        projectInputs[i].value = projectName;
        projectInputs[i].disabled = true;
    }
}

export default projectDisplay;