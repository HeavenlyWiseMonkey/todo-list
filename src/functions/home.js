import makeToDoBox from './makeToDoBox';
import clearSelected from './clearSelected';

const content = document.querySelector('.content');

function home() {
    const ToDoList = document.querySelector('.ToDoList');
    const dueDateInputs = document.querySelectorAll('#dueDate');
    const projectInputs = document.querySelectorAll('#project');
    const homeText = document.querySelector('.home');
    ToDoList.textContent = '';

    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                makeToDoBox(obj[i], i);
            }
        }
    }

    for (let i=0; i<dueDateInputs.length; i++) {
        dueDateInputs[i].disabled = false;
        dueDateInputs[i].max = '3024-01-01';
    }

    for (let i=0; i<projectInputs.length; i++) {
        projectInputs[i].disabled = false;
    }

    clearSelected();
    homeText.classList.add('selected');
}

export default home;