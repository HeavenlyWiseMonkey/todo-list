import makeToDoBox from './makeToDoBox'


const content = document.querySelector('.content');

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.addEventListener('click', () => {
    localStorage.clear();
});

content.appendChild(clearButton);

function home() {
    const ToDoList = document.querySelector('.ToDoList');
    ToDoList.textContent = '';
    // Show localStorage toDos
    for (const item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            let obj = JSON.parse(localStorage.getItem(item));
            for (let i = 0; i<obj.length; i++) {
                makeToDoBox(obj[i], i);
            }
        }
    }

    // Make dialog and inputs

    
    // Add Event Listeners


    


    



}







export default home;