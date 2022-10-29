import { students } from "../data/studentsArr.js";
import { reasons } from "../data/reasons.js";
import { welcomeCardDomStr } from "../components/welcomeCardDomStr.js";
import { houseCrestModalStr } from "../components/houseCrestModalStr.js";
import { pageDivOnDomStr } from "../components/pageDivOnDomStr.js";
import { cardDivTitlesOnDomStr } from "../components/cardDivTitlesOnDomStr.js";
import { renderToDom } from "../utils/renderToDom.js";
import { randomizer } from "../utils/randomizer.js";

//**** Global Query Selectors
const body = document.querySelector('body');
const page = document.querySelector('#page');
const welcomeDiv = document.querySelector('#welcome');
const cards = document.querySelector('#cards');
const hallows = document.querySelector('#hallows');
const houseCrestDiv = document.querySelector('#houseCrestDiv');

//* Initial Page Load
const welcomeCardOnDom = () => {
  renderToDom('#welcome', welcomeCardDomStr);
  document.location = '#';
}

//** HTML on DOM Functions

//** Populates page when Welcome Btn Clicked
const populate = (e) => {
  if (e.target.id === 'welcomeBtn') {
    welcomeDiv.innerHTML = '';
    renderToDom('#houseCrestDiv', houseCrestModalStr);
    renderToDom('#page', pageDivOnDomStr);
    renderToDom('#card-titles', cardDivTitlesOnDomStr);
    cardsOnDom(students);
  }
}
const cardsOnDom = (arr) => {
  const aliveStudents = arr.filter(item => item.alive);
  studentCardsOnDom(aliveStudents);
  expelledCardsOnDom(aliveStudents);
  hallowsModalOnDom();
};
//** HTML Student Cards - called in cardsOnDom()
const studentCardsOnDom = (arr) => {
  let studentString = '';
  arr.sort((a, b) => a.house.localeCompare(b.house)).forEach(obj => {
    if (obj.student) {
      studentString += `<div class="card"><div class="img-container ${obj.house}">
    <img class="card-img-top ${obj.house} house-crest" src="./media/${obj.house}.png" alt="${obj.house} Crest" data-bs-toggle="modal" data-bs-target="#houseCrestModal" id="houseCrest--${obj.id}"></div>
    <div class="card-body ${obj.house}-card">
      <h5 class="card-title">${obj.name}</h5>
      <h6 class="">${obj.house}</h6>
      <button class="btn btn-sm ${obj.house} ${obj.house}-btn student-card-btn" id="expel--${obj.id}">Expelliarmus!</button>
    </div>
  </div>`
    }
  })
  renderToDom('#student-cards', studentString);
};
//** HTML Expelled Cards - called in cardsOnDom()
const expelledCardsOnDom = (arr) => {
  let expelledString = '';
  arr.sort((a, b) => a.name.localeCompare(b.name)).forEach(obj => {
    if (!obj.student) {
      expelledString += `<div class="card"><div class="img-container expelled-img">
    <img class="card-img-top house-crest" src="./media/death-eater.png" alt="Death Eater Image" data-bs-toggle="modal" data-bs-target="#houseCrestModal" id="houseCrest--${obj.id}"></div>
    <div class="card-body expelled-card-body">
      <h6 class="card-title">${obj.name}</h6>
      <p class="card-text reason">Reason for expulsion:</p>
      <p class="card-text">${obj.reason}</p>
      <div class="exp-card-btns">
        <a class="btn btn-sm btn-dark card-btn delete-btn" id="become--${obj.id}">Avada Kedavra!</a>
        <a class="btn btn-sm btn-light card-btn appeal-btn" id="appeal--${obj.id}">Appeal!</a>
      </div>
    </div>
  </div>`
    }
  })
  renderToDom('#expelled-cards', expelledString);
}
//HTML Hallows Modal - called in cardsOnDom()
const hallowsModalOnDom = () => {
  const deceasedStudents = students.filter(item => !item.alive);
  if (deceasedStudents.length > 0) {
    let listStr = ``;
    for (const item of deceasedStudents) {
      listStr += `
        <option value="${item.id}">${item.name}</option>`
    }
    let hallowsModalStr = `
<img src="./media/hallows.png" alt="The Deathly Hallows" class="hallows-img" id="resStone" data-bs-toggle="modal" data-bs-target="#exampleModal">

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Who deserves the stone?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="./media/stone.png" alt="resurrection stone" class="stone"/>
      </div>
      <div class="select-student">
        <select class="form-select" aria-label="Default select example" id="angelSelect">                
          ${listStr}
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="resBtn">Resurrect!</button>
      </div>
    </div>
  </div>
</div>`;
    renderToDom('#hallows', hallowsModalStr);
  }
  else if (deceasedStudents.length === 0) {
    hallows.innerHTML = '';
  }
};


//**** Button and Form Functions

//**** Card Button Functions
const cardBtns = (e) => {
  e.preventDefault();
  expelBtn(e);
  killBtn(e);
  appealBtn(e);
  cardsOnDom(students);
}
const expelBtn = (e) => {
  if (e.target.id.includes('expel')) {
    const [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const expelledStudent = students[studentIndex];
    expelledStudent.student = false;
    expelledStudent.reason = randomizer(reasons);
  }
}
const killBtn = (e) => {
  if (e.target.id.includes('become')) {
    const [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const cursedStudent = students[studentIndex];
    cursedStudent.alive = false;
    document.location = '#';
  }
}
const appealBtn = (e) => {
  if (e.target.id.includes('appeal')) {
    const [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const reinstatedStudent = students[studentIndex];
    reinstatedStudent.student = true;
  }
}

//**** Creates new Student Card
const newStudent = (e) => {
  e.preventDefault();
  // array for House Randomizer
  const houses = ['Gryffindor', 'Ravenclaw', 'Slytherin', 'Hufflepuff'];
  // Building new Student Object
  const student =
  {
    id: students.length + 1,
    name: document.querySelector('#name').value,
    house: randomizer(houses),
    student: true,
    reason: '',
    alive: true
  }
  form.reset();
  students.push(student);
  hallowsModalOnDom()
  cardsOnDom(students);
}
//**** House Filter Buttons
const houseFilter = (e) => {
  if (e.target.id === 'all') {
    cardsOnDom(students);
  } else if (e.target.type === 'button') {
    const houseArr = students.filter(obj => obj.house === e.target.id || !obj.student);
    cardsOnDom(houseArr);
  }
}
//**** Resurrection Stone
const purgatory = (e) => {
  if (e.target.id === 'resBtn') {
    const value = document.querySelector('#angelSelect').value;
    const angelIndex = students.findIndex(obj => obj.id === Number(value));
    const angel = students[angelIndex];
    angel.student = true;
    angel.alive = true;
    document.querySelector('#exampleModal').style.visibility = 'hidden';
    students[angelIndex].alive = true;

    cardsOnDom(students);
  }
}
//**** Enters Student Data on Student Edit Modal
const studentForm = (e) => {
  if (e.target.id.includes('houseCrest')) {
    const [, taco] = e.target.id.split('--');
    const crestIndex = students.findIndex(obj => obj.id === Number(taco));
    const editingStudent = students[crestIndex];
    document.querySelector('#editName').value = editingStudent.name;
    // ** Sets the value of the button on the Modal to the id of the Student, so you can target and edit with another event listener **
    document.querySelector('#editStudentSave').value = editingStudent.id;
    //
    document.querySelector('#houseChoiceSelect').value = editingStudent.house;
    const studentYes = document.querySelector('#studentYes');
    const studentNo = document.querySelector('#studentNo');
    if (editingStudent.student) {
      studentYes.checked = true;
    } else if (!editingStudent.student) {
      studentNo.checked = true;
    }
  }
}
//**** Edits Student Data from Student Edit Modal
const editStudent = (e) => {
  if (e.target.id === 'editStudentSave') {
    // Gets the value of the button set in studentForm() function $$$$$$$$$
    const currentStudentIndex = students.findIndex(obj => obj.id === Number(e.target.value))
    const currentStudent = students[currentStudentIndex];
    currentStudent.name = document.querySelector('#editName').value;
    currentStudent.house = document.querySelector('#houseChoiceSelect').value;
    if (document.querySelector('#studentYes').checked) {
      currentStudent.student = true;
    } else if (document.querySelector('#studentNo').checked) {
      currentStudent.student = false;
      currentStudent.reason = randomizer(reasons);
    }
  }
  cardsOnDom(students);
}

//**** Event Listeners

// Handles the Welcome Page Button
welcomeDiv.addEventListener('click', populate);
// Handles the Card Buttons for Expel, Appeal, and Killing Curse
page.addEventListener('submit', newStudent);
// Handles the Filters for the House Buttons
page.addEventListener('click', houseFilter);
// Handles the Resurrection Modal Button
cards.addEventListener('click', cardBtns);
// Handles the Submit New Student Form
hallows.addEventListener('click', purgatory);
// Handles the Edit Student Modal Button
body.addEventListener('click', studentForm);
// Handles the Edit Student Modal Save Button
houseCrestDiv.addEventListener('click', editStudent);

// Initial Page Load
const startApp = () => {
  welcomeCardOnDom();
}
startApp();
