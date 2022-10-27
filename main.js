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
const welcomeBtn = document.querySelector('#welcomeBtn');
const cardTitles = document.querySelector('#card-titles')
const cards = document.querySelector('#cards');
const studentCards = document.querySelector('#student-cards');
const expelledCards = document.querySelector('#expelled-cards');
const hallows = document.querySelector('#hallows');
const resStone = document.querySelector('#resStone');
const houseCrestDiv = document.querySelector('#houseCrestDiv');
const houseChoiceSelect = document.querySelector('#houseChoiceSelect');
const studentYes = document.querySelector('#studentYes');
const studentNo = document.querySelector('#studentNo');
const editName = document.querySelector('#editName');

//**** Functions

//**** Render HTML to DOM function
const renderToDom = (divId, html) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = html;
}
//**** Random Number Generator
const randNum = (num) => {
  return Math.floor(Math.random() * num + 1);
}

// Card on Welcome Screen
const welcomeCard = () => {
  let domString = `<div class="welcome-card">
  <img class="welcome-img" src="./Media/sorting-hat.png" class="card-img-top" alt="Hogwarts Sorting Hat">
  <div class="welcome-card-body">
    <h5 class="card-title welcome-card-title">Behold! I am the Sorting Hat!</h5>
    <p class="card-text welcome-card-text">Before classes begin, all young Witches and Wizards must be sorted into a House!</p>
    <a href="#"  id='welcomeBtn' class="btn btn-dark" autofocus>Get Sorted</a>
  </div>
</div>
`;
  renderToDom('#welcome', domString);
}
// Populate DOM with HTML when button on welcome card is pressed
const populate = () => {
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
  welcomeDiv.style.display = 'none';
  cardTitles.style.display = 'flex';
  renderToDom('#page', domString);
  renderToDom('#houseCrestDiv', houseCrestModalStr)
  cardsOnDom(students, '#student-cards', '#expelled-cards');
};
// Puts the cards on the DOM in the different Divs, 
// also handles the Resurrection Modal
const cardsOnDom = (array, ...div) => {
  let studentString = '';
  let expelledString = '';
  const aliveStudents = array.filter(item => item.alive);
  const deceasedStudents = array.filter(item => !item.alive);
  // Resurrection Modal
  if (deceasedStudents.length > 0) {
    let listStr = ``;
    for (angel of deceasedStudents) {
      listStr += `
        <option value="${angel.id}">${angel.name}</option>`
    }
    let modalStr = `
      <img src="./Media/hallows.png" alt="The Deathly Hallows" class="hallows-img" id="resStone" data-bs-toggle="modal" data-bs-target="#exampleModal">

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="select-student">
              <select class="form-select" aria-label="Default select example" id="angelSelect">
                <option selected id="notAChoice" value="notAChoice">Choose Student to Resurrect</option>
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
  // Cards on the page:
  for (obj of aliveStudents) {
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
    else if (!obj.student) {
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
  }
  renderToDom(div[0], studentString);
  renderToDom(div[1], expelledString);
}
// Creates new student when the Sort button is pressed
const newStudent = (event) => {
  event.preventDefault();
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
  cardsOnDom(students, '#student-cards', '#expelled-cards');
}
// Filters for the House Buttons
const houseFilter = (event) => {
  if (event.target.id === 'gryffindor') {
    const gryff = students.filter(obj => obj.house === "Gryffindor" || !obj.student);
    cardsOnDom(gryff, '#student-cards', '#expelled-cards');
  } else if (event.target.id === 'hufflepuff') {
    const puff = students.filter(obj => obj.house === "Hufflepuff" || !obj.student);
    cardsOnDom(puff, '#student-cards', '#expelled-cards');
  } else if (event.target.id === 'ravenclaw') {
    const raven = students.filter(obj => obj.house === "Ravenclaw" || !obj.student);
    cardsOnDom(raven, '#student-cards', '#expelled-cards');
  } else if (event.target.id === 'slytherin') {
    const slither = students.filter(obj => obj.house === "Slytherin" || !obj.student);
    cardsOnDom(slither, '#student-cards', '#expelled-cards');
  } else if (event.target.id === 'all') {
    cardsOnDom(students, '#student-cards', '#expelled-cards');
  }
}
// Puts a card back on the DOM once it has been removed
const purgatory = (event) => {
  if (event.target.id === 'resBtn') {
    const value = document.querySelector('#angelSelect').value;
    if (value === "notAChoice") {
      alert('You must choose a Student to resurrect!')
    } else {
      const angelIndex = students.findIndex(obj => obj.id === Number(value));
      const angel = students[angelIndex];
      angel.student = true;
      angel.alive = true;
      document.querySelector('#exampleModal').style.visibility = 'hidden';
      students[angelIndex].alive = true;
    }
    cardsOnDom(students, '#student-cards', '#expelled-cards');
  }
}
// Puts the info of the student clicked on the Edit Modal
const studentForm = (event) => {
  if (event.target.id.includes('houseCrest')) {
    [, taco] = event.target.id.split('--');
    const crestIndex = students.findIndex(obj => obj.id === Number(taco));
    const editingStudent = students[crestIndex];
    document.querySelector('#editName').value = editingStudent.name;
    // this is the money line here- sets the value of the button on the Modal to the id of the Student, so you can tartget and edit with another event listener
    //$$$$$$$$$$$$$
    document.querySelector('#editStudentSave').value = editingStudent.id;
    //$$$$$$$$$$$$$
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
// Takes info from the Edit Modal and updates the student card and repopulates the DOM
const editStudent = (event) => {
  if (event.target.id === 'editStudentSave') {
    // Gets the value of the button set in studentForm() function $$$$$$$$$
    const currentStudentIndex = students.findIndex(obj => obj.id === Number(event.target.value))
    const currentStudent = students[currentStudentIndex];
    currentStudent.name = document.querySelector('#editName').value;
    currentStudent.house = document.querySelector('#houseChoiceSelect').value;
    const studentYes = document.querySelector('#studentYes');
    const studentNo = document.querySelector('#studentNo');
    if (studentYes.checked) {
      currentStudent.student = true;
    } else if (studentNo.checked) {
      currentStudent.student = false;
    }
  }
  cardsOnDom(students, '#student-cards', '#expelled-cards');
}

//**** Event Listeners

// Runs populate() when Welcome Card button is pressed
welcomeDiv.addEventListener('click', e => {
  if (e.target.id === 'welcomeBtn') {
    populate();
  }
});

// Moves Students to Death Eaters, and Killing Curse
cards.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.id.includes('expel')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const expelledStudent = students[studentIndex];
    // Expelled Student Reason Randomizer
    const randReason = () => {
      switch (randNum(4)) {
        case 1:
          return 'Being a turd'
          break;
        case 2:
          return 'Unspeakable Curse'
          break;
        case 3:
          return 'Some Death Eater Shit'
          break;
        case 4:
          return 'Being a total dick'
          break;
      }
    }
    expelledStudent.student = false;
    expelledStudent.reason = randReason();
  } else if (e.target.id.includes('become')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const cursedStudent = students[studentIndex];
    cursedStudent.alive = false;
  } else if (e.target.id.includes('appeal')) {
    [, taco] = e.target.id.split('--');
    const studentIndex = students.findIndex(obj => obj.id === Number(taco));
    const reinstatedStudent = students[studentIndex];
    reinstatedStudent.student = true;
  }
  cardsOnDom(students, '#student-cards', '#expelled-cards');
});
// Creates a new Student Card
page.addEventListener('submit', newStudent);
// Filters for the House Buttons
page.addEventListener('click', houseFilter);
hallows.addEventListener('click', purgatory);
body.addEventListener('click', studentForm);
houseCrestDiv.addEventListener('click', editStudent);

// Initial Page Load
const startApp = () => {
  welcomeCard();
}
startApp();
