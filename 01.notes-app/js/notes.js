let notes = getNotes();     // the notes that are stored in the local storage
let counter = getCounter(); // the counter that is stored in the local storage - will be used to specify the unique id of each note
let filter = 'all';         // the default filter is 'all' so that when the app loads all the notes are shown

window.addEventListener('DOMContentLoaded', function() {
  // 'showGRDate()' is needed in order to show the date and time immediately when the app loads
  // because the 'setInterval()' has a delay of 1s before its first execution
  showGRDate();
  this.setInterval(showGRDate, 1000);
  showNotes();

  this.document.querySelector('#inputNote').addEventListener('input', function() {
    onUserInputController(this.value.trim());
  });

  this.document.querySelector('#inputNoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    onAddNoteController(document.querySelector('#inputNote').value.trim());
  });

  this.document.querySelectorAll('.btn-filter').forEach(btn => 
    btn.addEventListener('click', onFilterBtnClickedController)
  );
});

/**
 * Actions taken while the user is typing a new note.
 * Actions include updating the input characters' 
 * counter to indicate if the user has reached the maximum
 * allowed characters.
 * @param {string} data the input text.
 */
function onUserInputController(data) {
  updateCharCounter(data);
}

/**
 * Actions taken after the form for adding a new note is submitted.
 * Actions include resetting the text in the input 
 * field and adding a note containing the input text.
 * @param {string} text the input text.
 * @returns the control back to the caller if the text is empty.
 */
function onAddNoteController(text) {
  resetField();
  if (!text) return;
  addNote(text);
}

/**
 * Actions taken after one of the filtering buttons 
 * is clicked.
 * Actions include updating the filtering according
 * to the selected button.
 */
function onFilterBtnClickedController() {
  updateFiltering(this);
}

/**
 * Shows the current date and time in the following format:
 * 
 * Day, DD Month YYYY
 * HH:mm:ss
 * 
 * Day and Month are written out in Greek.
 */
function showGRDate() {
  const daysGR = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];
  const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']; 
  const currentDate = new Date();

  // extract information from 'currentDate'
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // convert numeral values to the corresponding day and month
  const dayGR = daysGR[day];
  const monthGR = monthsGR[month];

  // build the date and time according to the format
  const dateStr = `${dayGR}, ${date} ${monthGR} ${year}`;
  const timeStr = `${(hours < 10) ? '0' : ''}${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;

  // assign the values to the corresponding UI Elements
  document.querySelector('#currentDate').textContent = dateStr;
  document.querySelector('#currentTime').textContent = timeStr;
}

/**
 * Gets user's notes from the corresponding item in the local storage.
 * @returns the notes stored in the local storage in JavaScript array format
 *          or an empty array if the item 'notes' is not defined in the
 *          local storage.
 */
function getNotes() {
  let storageNotes = localStorage.getItem('notes');
  return storageNotes ? JSON.parse(storageNotes) : [];
}

/**
 * Gets counter's value from the corresponding item in the local storage.
 * @returns the counter's value in number format or 1 if the item
 *          'counter' is not defined in the local storage.
 */
function getCounter() {
  let storageCounter = localStorage.getItem('counter');
  return storageCounter ? parseInt(storageCounter) : 1;
}

/**
 * Assigns the notes to be shown to the corresponding UI Element.
 */
function showNotes() {
  document.querySelector('.notes-wrapper').innerHTML = buildNotes();
}

/**
 * Renders the notes to be shown, that is the notes that satisfy
 * the current filter.
 * @returns a string with the notes to be shown if they exist,
 *          or a customized 'not-found' message otherwise.
 */
function buildNotes() {
  let filteredNotes = filterNotes();

  if (filteredNotes.length) {
    return filteredNotes.map(note => `
      <div class="note ${note.completed ? 'note-checked' : ''}">
        <div class="note-info">
          <input
            id="${'noteCheckbox' + note.id}"
            class="note-checkbox" ${note.completed ? "checked" : ""}
            type="checkbox"
            onclick="updateCompletedProperty(${note.id})"
          >
          <label for="${'noteCheckbox' + note.id}" class="note-text">${note.text}</label>
        </div>
        <button class="btn-del-note" title="Διαγραφή" onclick="deleteNote(${note.id})">
          <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
          <span class="visually-hidden">Διαγραφή</span>
        </div>
      </div>`).join('');
  } else {
    return `
    <div class="not-found">
      <div class="not-found-img"></div>
      <p>Δε βρέθηκαν σημειώσεις</p>
    </div>`;
  }
}

/**
 * Filters the notes according to the current filter.
 * @returns an array with the notes that satisfy the
 *          current filter.
 */
function filterNotes() {
  let filteredNotes;

  switch (filter) {
    case 'all':
      filteredNotes = notes;
      break;
    case 'pending':
      filteredNotes = notes.filter(note => note.completed === false);
      break;
    case 'completed':
      filteredNotes = notes.filter(note => note.completed === true);
      break;
    default:
      filteredNotes = [];
      break;
  }

  return filteredNotes;
}

/**
 * Counts and shows the number of
 * characters that the user has typed.
 * @param {string} text the input text.
 */
function updateCharCounter(text) {
  let numOfChars = countChars(text);
  showCharCounter(numOfChars);
}

/**
 * Counts the number of characters of a given string.
 * @param {string} text the string whose characters are to be counted.
 * @returns the number of characters that the given string contains.
 */
function countChars(text) {
  return text.length;
}

/**
 * Assigns the given number to the corresponding UI Element.
 * @param {number} numOfChars an integer that represents the number
 *                      of characters that the input text has.
 */
function showCharCounter(numOfChars) {
  document.querySelector('#inputChars').textContent = numOfChars;
}

/**
 * Resets the value of the input field to the empty string
 * and the number of input characters to 0.
 */
function resetField() {
  document.querySelector('#inputNoteForm').reset();
  document.querySelector('#inputChars').textContent = 0;
}

/**
 * Inserts a note, updates the local storage and shows the 
 * updated list of notes in the UI.
 * @param {string} data the text of the note to be inserted.
 */
function addNote(data) {
  let note = { id: counter, text: data, completed: false };

  notes = [...notes, note];
  updateLocalStorage('notes', JSON.stringify(notes));
  updateLocalStorage('counter', ++counter);

  // if the current filter is 'completed', adding a note
  // automatically changes the filter to 'all' so that the user
  // can see the recently added note.
  if (filter === 'completed') {
    filter = 'all';
    styleFilterBtns();
  }
  
  showNotes();
}

/**
 * Marks a note as completed or unmarks it, according to the user's 
 * clicking in the corresponding checkbox, updates the local storage
 * and shows the updated list of notes in the UI.
 * @param {number} id the value of the property 'id' of the note 
 *                    to be updated.
 */
function updateCompletedProperty(id) {
  // reverse the value of the property 'completed' for the note with the given id
  notes = notes.map(note => (note.id === id) ? { ...note, completed: !note.completed } : note);
  updateLocalStorage('notes', JSON.stringify(notes));
  showNotes();
}

/**
 * Deletes a note, updates the local storage and shows the updated 
 * list of notes in the UI.
 * @param {number} id the value of the property 'id' of the note 
 *                    to be deleted.
 */
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  updateLocalStorage('notes', JSON.stringify(notes));
  showNotes();
}

/**
 * Updates the value of the given key in the local storage.
 * If the key does not exist, it creates it.
 * @param {string} key the key whose value will be updated.
 * @param {*} value the new value.
 */
function updateLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Updates the filter according to the filtering button that 
 * was clicked, shows the notes that satisfy the selected filter,
 * styles the filtering buttons to show the currently selected filter
 * and updates the document's title.
 * @param filterBtn the filtering button that was clicked.
 */
function updateFiltering(filterBtn) {
  filter = filterBtn.dataset.filter;
  showNotes();
  styleFilterBtns();
  updateTitle();
}

/**
 * Renders the filtering buttons to indicate the selected filter.
 */
function styleFilterBtns() {
  let currentFilterBtn = document.querySelector('.btn-filter.active');
  let selectedFilterBtn = document.querySelector(`button[data-filter="${filter}"]`);

  if (currentFilterBtn !== selectedFilterBtn) {
    currentFilterBtn.classList.remove('active');
    selectedFilterBtn.classList.add('active');
  }
}

/**
 * Updates the document's title.
 */
function updateTitle() {
  const title = document.querySelector('title');

  switch (filter) {
    case 'pending':
      title.textContent = 'Οι σημειώσεις μου - Εκκρεμείς | Notes';
      break;
    case 'completed':
      title.textContent = 'Οι σημειώσεις μου - Ολοκληρωμένες | Notes';
      break;
    default:
      title.textContent = 'Οι σημειώσεις μου | Notes';
      break;
  }
}