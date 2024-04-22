const ToDo = function (title, description, dueDate, priority, project) {
    return {title, description, dueDate, priority};
}

const Project = function (name) {
  let toDos = [];

  const add = (newToDo) => {
    toDos.push(newToDo);
    if (storageAvailable("localStorage")) {
      localStorage.setItem(name, JSON.stringify(toDos));
    }

  }

  return {name, toDos, add}
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function display() {
    if (localStorage.length) {
        console.log(localStorage);
    }
}

function question() {
  title = prompt('Title');
  description = prompt('Description');
  dueDate = prompt('Due Date');
  priority = prompt('Priority');

  newToDo = ToDo(title, description, dueDate, priority);
  return newToDo;
}

// homework = ToDo('finish homework','very difficult', '2024-04-31', 'high');

let school = Project('School');

display();
school.add(question());
display();
