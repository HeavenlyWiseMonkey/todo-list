import makeToDoBox from './makeToDoBox';
import {format} from 'date-fns';
import clearSelected from './clearSelected';

function today() {
    const ToDoList = document.querySelector('.ToDoList');
    const projectInputs = document.querySelectorAll('#project');
    const todayText = document.querySelector('.today');
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    ToDoList.textContent = '';
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                let dateData = obj[i].dueDate.split('-');
                let projectDate = new Date(Number(dateData[0]), Number(dateData[1])-1, Number(dateData[2]));
                let projectDay = projectDate.getDate();
                let projectMonth = projectDate.getMonth();
                let projectYear = projectDate.getFullYear();
                if (currentDay === projectDay && currentMonth === projectMonth && currentYear === projectYear) {
                    makeToDoBox(obj[i], i);
                }
            }
        }
    }
    for (let i=0; i<projectInputs.length; i++) {
        projectInputs[i].disabled = false;
    }
    todayLock(currentDate);
    clearSelected();
    todayText.classList.add('selected');
}

function todayLock(currentDate) {
    const dueDateInputs = document.querySelectorAll('#dueDate');
    const stringDate = format(currentDate, 'yyyy-MM-dd');
    for (let i=0; i<dueDateInputs.length; i++) {
        dueDateInputs[i].value = stringDate;
        dueDateInputs[i].disabled = true;
    }
}

export default today;