const welcomeDiv = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');


const renderToDom = (divId, html) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = html;
}

const welcomeCard = () => {
  let domString = `<div class="card" style="width: 18rem;">
  <img src="https://www.pngkey.com/png/full/106-1067907_sorting-hat-png-harry-potter-sorting-hat-png.png" class="card-img-top" alt="Hogwarts Sorting Hat">
  <div class="card-body">
    <h5 class="card-title">Welcome to Hogwarts!</h5>
    <p class="card-text">Before classes begin, all young Witches and Wizards must be sorted into a House!</p>
    <a href="#"  id='welcomeBtn' class="btn btn-dark">Get Started</a>
  </div>
</div>
`
  renderToDom('#welcome', domString);
}
const populate = () => {
  const domString = `<h1>Welcome to Hogwarts</h1>
  <form id="form">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Witch/Wizard Name:" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">Sort!</button>
      </div>
    </div>
  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
    <button type="button" class="btn btn-secondary">All</button>
    <button type="button" class="btn btn-danger">Gryffindor</button>
    <button type="button" class="btn btn-warning">Hufflepuff</button>
    <button type="button" class="btn btn-primary">Ravenclaw</button>
    <button type="button" class="btn btn-success">Slytherin</button>
  </div>
  <div id="cards">
    <div id="student-cards"></div>
    <div id="expelled-cards"></div>
  </div>
  `;
  welcomeDiv.style.display = 'none';
  renderToDom('#page', domString);
};


// Event Listeners
welcome.addEventListener('click', populate);


// Initial Page Load
const startApp = () => {
  welcomeCard();
}
startApp();
