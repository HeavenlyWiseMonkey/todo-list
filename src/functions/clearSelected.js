function clearSelected() {
    const home = document.querySelector('.home');
    const today = document.querySelector('.today');
    const week = document.querySelector('.week');
    const projectNames = document.querySelectorAll('.projectName');

    const elements = [home, today, week, ...projectNames];
    
    for (let i=0; i<elements.length; i++) {
        elements[i].classList.remove('selected');
    }
}

export default clearSelected;