import makeToDoBox from './makeToDoBox'
import {format} from 'date-fns';

import clearSelected from './clearSelected';

function week() {
    const ToDoList = document.querySelector('.ToDoList');
    const dueDateInputs = document.querySelectorAll('#dueDate');
    const projectInputs = document.querySelectorAll('#project');
    const weekText = document.querySelector('.week');
    const currentDate = new Date();
    const maxDate = new Date(new Date().setDate(currentDate.getDate()+6));
    const maxTime = maxDate.getTime();
    ToDoList.textContent = '';
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                let dateData = obj[i].dueDate.split('-');
                let projectDate = new Date(Number(dateData[0]), Number(dateData[1])-1, Number(dateData[2]));
                let projectTime = projectDate.getTime();
                if (maxTime - projectTime < 605000000) {
                    makeToDoBox(obj[i], i);
                }
            }
        }
    }
    for (let i=0; i<dueDateInputs.length; i++) {
        dueDateInputs[i].disabled = false;
    }
    for (let i=0; i<projectInputs.length; i++) {
        projectInputs[i].disabled = false;
    }
    weekLock(currentDate);
    clearSelected();
    weekText.classList.add('selected');
}

function weekLock(currentDate) {
    const dueDateInputs = document.querySelectorAll('#dueDate');
    const currentStringDate = format(currentDate, 'yyyy-MM-dd');
    const maxDate = new Date(new Date().setDate(currentDate.getDate()+6));
    const maxStringDate = format(maxDate, 'yyyy-MM-dd');
    for (let i=0; i<dueDateInputs.length; i++) {
        dueDateInputs[i].value = currentStringDate;
        dueDateInputs[i].max = maxStringDate;
    }
}



export default week;