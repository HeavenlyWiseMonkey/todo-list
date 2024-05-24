function makeAddTaskButton() {
    const content = document.querySelector('.content');
    const addTaskDialog = document.querySelector('.addTaskDialog');
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+ Add Task'
    addTaskButton.addEventListener('click', () => {
        addTaskDialog.showModal();
    });
    content.appendChild(addTaskButton);
}

export default makeAddTaskButton;