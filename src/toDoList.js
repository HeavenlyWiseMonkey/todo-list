function ToDo (title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.status = false;
}

function Project(name) {
  this.name = name;
  this.toDoArray = [];

  this.add = (newToDo) => {
    newToDo.project = name;
    this.toDoArray.push(newToDo);
  }

  this.remove = (index) => {
    this.toDoArray.splice(index, 1);
  }

  this.changeTitle = (index, input) => {
    this.toDoArray[index].title = input;
  }

  this.changeDescription = (index, input) => {
    this.toDoArray[index].description = input;
  }

  this.changeDueDate = (index, input) => {
    this.toDoArray[index].dueDate = input;
  }

  this.changePriority = (index, input) => {
    this.toDoArray[index].priority = input;
  }
}

function display() {
    if (localStorage.length) {
        console.log(localStorage);
    }
}

function question() {
  const title = prompt('Title');
  const description = prompt('Description');
  const dueDate = prompt('Due Date');
  const priority = prompt('Priority');

  const newToDo = new ToDo(title, description, dueDate, priority);
  return newToDo;
}

function addToLocalStorage(project) {
  localStorage.setItem(project.name, JSON.stringify(project.toDoArray));
}

export {Project, display, question, addToLocalStorage};