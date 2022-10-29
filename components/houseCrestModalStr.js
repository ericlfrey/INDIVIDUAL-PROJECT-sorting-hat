export const houseCrestModalStr = `
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
