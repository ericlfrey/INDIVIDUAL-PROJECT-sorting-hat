const students = [
  {
    id: 1,
    name: 'Harry Potter',
    house: 'Gryffindor',
    student: true,
    reason: '',
    alive: true
  },
  {
    id: 2,
    name: 'Draco Malfoy',
    house: 'Slytherin',
    student: true,
    reason: '',
    alive: true
  },
  {
    id: 3,
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    student: true,
    reason: '',
    alive: true
  },
  {
    id: 4,
    name: 'Cedric Digory',
    house: 'Hufflepuff',
    student: true,
    reason: '',
    alive: true
  },
  {
    id: 5,
    name: 'Peter Pettigrew',
    house: 'Gryffindor',
    student: false,
    reason: 'For naming He Who Must Not Be Named',
    alive: true
  },
  {
    id: 6,
    name: 'Tom Riddle',
    house: 'Slytherin',
    student: false,
    reason: 'For being the mf Dark Lord!',
    alive: true
  }
];

//**** Query Selectors
const body = document.querySelector('body');
const page = document.querySelector('#page');
const welcomeDiv = document.querySelector('#welcome');
const cards = document.querySelector('#cards');
const hallows = document.querySelector('#hallows');
const houseCrestDiv = document.querySelector('#houseCrestDiv');
const editName = document.querySelector('#editName');

//******** Utility Functions

//******** Render HTML to DOM function
const renderToDom = (divId, html) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = html;
}
//******** Random Number Generator
const randNum = (num) => {
  return Math.floor(Math.random() * num + 1);
}

//* Initial Page Load
const welcomeCardOnDom = () => {
  let domString = `<div class="welcome-card">
  <img class="welcome-img" src="./Media/sorting-hat.png" class="card-img-top" alt="Hogwarts Sorting Hat">
  <div class="welcome-card-body">
    <h5 class="card-title welcome-card-title">Before classes begin, all young Witches and Wizards must be sorted into a House!</h5>
    <a href="#"  id='welcomeBtn' class="btn btn-dark welcome-btn" autofocus>Get Sorted</a>
  </div>
</div>
`;
  renderToDom('#welcome', domString);
}

//** Populates page when Welcome Btn Clicked
const populate = (e) => {
  if (e.target.id === 'welcomeBtn') {
    const cardTitles = document.querySelector('#card-titles')
    welcomeDiv.style.display = 'none';
    cardTitles.style.display = 'flex';
    studentEditModalOnDom();
    pageDivOnDom();
    cardsOnDom(students);
  }
}
//** called in populate() - HTML Edit Modal
const studentEditModalOnDom = () => {
  const houseCrestModalStr = `
  <div class="modal fade" id="houseCrestModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Sorcerer</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input class="form-control" type="text" placeholder="Edit Name" aria-label="default input example" id="editName">
      </div>
      <div id="houseChoice">
        <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="houseChoiceSelect">
          <option value="Gryffindor">Gryffindor</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
        </select>
      </div>
      <div id="studentChoice">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="studentYes"
            value=""
          />
          <label class="form-check-label" for="studentYes">Student</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="studentNo"
            value="" />
          <label class="form-check-label" for="studentNo">Death Eater</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="editStudentSave" value="">Save</button>
      </div>
    </div>
  </div>
    </div>`;
  renderToDom('#houseCrestDiv', houseCrestModalStr);
}
//** called in populate() - HTML New Student input & Filter Buttons
const pageDivOnDom = () => {
  const domString =
    `<form id="form">
    <div class="input-group mb-3">
  <input type="text" class="form-control" id="name" placeholder="Witch/Wizard Name:" aria-label="Witch/Wizard Name:" aria-describedby="button-addon2" autocomplete="off" required>
  <button class="btn btn-dark" type="submit" id="button-addon2">Sort!</button>
</div>
  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-secondary filter-btn" id="all">All Houses</button>    
      <button type="button" class="btn Gryffindor filter-btn" id="gryffindor">Gryffindor</button>    
      <button type="button" class="btn Hufflepuff filter-btn" id="hufflepuff">Hufflepuff</button>    
      <button type="button" class="btn Ravenclaw filter-btn" id="ravenclaw">Ravenclaw</button>    
      <button type="button" class="btn Slytherin filter-btn" id="slytherin">Slytherin</button>
    </div>
  </div>`;
  renderToDom('#page', domString);
}

//*** Renders HTML cards on the DOM & Hallows Modal
const cardsOnDom = (arr) => {
  const aliveStudents = arr.filter(item => item.alive);
  studentCardsOnDom(aliveStudents);
  expelledCardsOnDom(aliveStudents);
  hallowsModalOnDom();
};
//HTML Student Cards
const studentCardsOnDom = (arr) => {
  let studentString = '';
  arr.sort((a, b) => a.house.localeCompare(b.house)).forEach(obj => {
    if (obj.student) {
      studentString += `<div class="card"><div class="img-container ${obj.house}">
    <img class="card-img-top ${obj.house} house-crest" src="./Media/${obj.house}.png" alt="${obj.house} Crest" data-bs-toggle="modal" data-bs-target="#houseCrestModal" id="houseCrest--${obj.id}"></div>
    <div class="card-body ${obj.house}-card">
      <h5 class="card-title">${obj.name}</h5>
      <h6 class="">${obj.house}</h6>
      <a href="#" class="btn btn-sm ${obj.house} ${obj.house}-btn card-btn" id="expel--${obj.id}">Expelliarmus!</a>
    </div>
  </div>`
    }
  })
  renderToDom('#student-cards', studentString);
};
//HTML Expelled Cards
const expelledCardsOnDom = (arr) => {
  let expelledString = '';
  arr.sort((a, b) => a.name.localeCompare(b.name)).forEach(obj => {
    if (!obj.student) {
      expelledString += `<div class="card"><div class="img-container expelled-img">
    <img class="card-img-top house-crest" src="./Media/death-eater.png" alt="Death Eater Image" data-bs-toggle="modal" data-bs-target="#houseCrestModal" id="houseCrest--${obj.id}"></div>
    <div class="card-body expelled-card-body">
      <h6 class="card-title">${obj.name}</h6>
      <p class="card-text reason">Reason for expulsion:</p>
      <p class="card-text">${obj.reason}</p>
      <a href="#" class="btn btn-sm btn-dark card-btn delete-btn" id="become--${obj.id}">Avada Kedavra!</a>
      <a href="#" class="btn btn-sm btn-light card-btn appeal-btn" id="appeal--${obj.id}">Appeal!</a>
    </div>
  </div>`
    }
  })
  renderToDom('#expelled-cards', expelledString);
}
//HTML Hallows Modal
const hallowsModalOnDom = () => {
  const deceasedStudents = students.filter(item => !item.alive);
  if (deceasedStudents.length > 0) {
    let listStr = ``;
    for (item of deceasedStudents) {
      listStr += `
        <option value="${item.id}">${item.name}</option>`
    }
    let modalStr = `
      <img src="./Media/hallows.png" alt="The Deathly Hallows" class="hallows-img" id="resStone" data-bs-toggle="modal" data-bs-target="#exampleModal">

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Who deserves the stone?</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="./Media/stone.png" alt="resurrection stone" class="stone"/>
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
    renderToDom('#hallows', modalStr);
  }
  else if (deceasedStudents.length === 0) {
    hallows.innerHTML = '';
  }
};
//**** Expel, Kill, and Appeal Buttons
const cardBtns = (e) => {
  e.preventDefault();
  expelBtn(e);
  killBtn(e);
  appealBtn(e);
  cardsOnDom(students);
}
const expelBtn = (e) => {
  if (e.target.id.includes('expel')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const expelledStudent = students[studentIndex];
    // Expelled Student Reason Randomizer
    const randReason = () => {
      switch (randNum(4)) {
        case 1:
          return 'Failed O.W.L. exams'
          break;
        case 2:
          return 'Sucking at Magic'
          break;
        case 3:
          return 'Some Death Eater Shit'
          break;
        case 4:
          return 'Being a total knob'
          break;
      }
    }
    expelledStudent.student = false;
    expelledStudent.reason = randReason();
  }
}
const killBtn = (e) => {
  if (e.target.id.includes('become')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const cursedStudent = students[studentIndex];
    cursedStudent.alive = false;
  }
}
const appealBtn = (e) => {
  if (e.target.id.includes('appeal')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const reinstatedStudent = students[studentIndex];
    reinstatedStudent.student = true;
  }
}


// Creates new Student Card
const newStudent = (e) => {
  e.preventDefault();
  // Randomizer to choose House
  const randomHouse = () => {
    switch (randNum(4)) {
      case 1:
        return 'Gryffindor'
        break;
      case 2:
        return 'Ravenclaw'
        break;
      case 3:
        return 'Slytherin'
        break;
      case 4:
        return 'Hufflepuff'
        break;
    }
  }
  // Building new Student Object
  const student =
  {
    id: students.length + 1,
    name: document.querySelector('#name').value,
    house: randomHouse(),
    student: true,
    reason: '',
    alive: true
  }
  form.reset();
  students.push(student);
  hallowsModalOnDom()
  cardsOnDom(students);
}
// House Filter Buttons
const houseFilter = (e) => {
  if (e.target.id === 'gryffindor') {
    const gryff = students.filter(obj => obj.house === "Gryffindor" || !obj.student);
    cardsOnDom(gryff);
  } else if (e.target.id === 'hufflepuff') {
    const puff = students.filter(obj => obj.house === "Hufflepuff" || !obj.student);
    cardsOnDom(puff);
  } else if (e.target.id === 'ravenclaw') {
    const raven = students.filter(obj => obj.house === "Ravenclaw" || !obj.student);
    cardsOnDom(raven);
  } else if (e.target.id === 'slytherin') {
    const slither = students.filter(obj => obj.house === "Slytherin" || !obj.student);
    cardsOnDom(slither);
  } else if (e.target.id === 'all') {
    cardsOnDom(students);
  }
}
// Resurrection Stone
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
// Enters Student Data on Student Edit Modal
const studentForm = (e) => {
  if (e.target.id.includes('houseCrest')) {
    [, taco] = e.target.id.split('--');
    const crestIndex = students.findIndex(obj => obj.id === Number(taco));
    const editingStudent = students[crestIndex];
    document.querySelector('#editName').value = editingStudent.name;
    // ** Sets the value of the button on the Modal to the id of the Student, so you can target and edit with another event listener **
    document.querySelector('#editStudentSave').value = editingStudent.id;
    //
    document.querySelector('#houseChoiceSelect').value = editingStudent.house;
    // const studentYes = document.querySelector('#studentYes');
    const studentNo = document.querySelector('#studentNo');
    if (editingStudent.student) {
      studentYes.checked = true;
    } else if (!editingStudent.student) {
      studentNo.checked = true;
    }
  }
}
// Edits Student Data from Student Edit Modal
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
