import makeToDoBox from './makeToDoBox'

function week() {
    const ToDoList = document.querySelector('.ToDoList');
    ToDoList.textContent = '';
    // Show localStorage toDos
    let currentDate = new Date();
    let currentDay = currentDate.getUTCDate();
    let currentMonth = currentDate.getUTCMonth();
    let currentYear = currentDate.getUTCFullYear();
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                let dateData = obj[i].dueDate.split('-');
                let projectDate = new Date(Number(dateData[0]), Number(dateData[1])-1, Number(dateData[2]));
                let projectDay = projectDate.getUTCDate();
                let projectMonth = projectDate.getUTCMonth();
                let projectYear = projectDate.getUTCFullYear();
                if (currentDay+7 >= projectDay && currentDay <= projectDay && currentMonth === projectMonth && currentYear === projectYear) {
                    makeToDoBox(obj[i], i);
                }
            }
        }
    }
}

export default week;