const addBox = document.querySelector('.add-box'),
  popupBox = document.querySelector('.popup-box'),
  closeIcon = document.querySelector('header i'),
  addBtn = popupBox.querySelector('button'),
  inputTitle = document.getElementById('inputTitle'),
  inputDesc = document.getElementById('inputDesc'),
  popupTitle = popupBox.querySelector('header p')

const months = [
  ' January ',
  ' February ',
  ' March ',
  ' April ',
  ' May ',
  ' June ',
  ' July ',
  'August ',
  ' September ',
  ' October ',
  ' November ',
  ' December ',
]
const notes = JSON.parse(localStorage.getItem('notes') || '[]')
let isUpdate = false,
  updateId

addBox.addEventListener('click', () => {
  inputTitle.focus()
  popupBox.classList.add('showNote')
})

closeIcon.addEventListener('click', () => {
  isUpdate = false
  inputTitle.value = ''
  inputDesc.value = ''
  addBtn.innerText = 'Add Note'
  popupTitle.innerText = 'Add a New Note'
  popupBox.classList.remove('showNote')
})

function showNotes() {
  document.querySelectorAll('.note').forEach((note) => note.remove())
  notes.forEach((note, index) => {
    let liTag = ` 
    <li class="note">
          <div class="details">
              <p>${note.title}</p>
              <span>${note.description}</span>
          </div>
          <div class="bottom-content">
              <span>September 19, 2022</span>
              <div class="settings">
                  <i onclick="showMenu(this)" class="fa-solid fa-ellipsis-h"></i>
                  <ul class="menu">
                      <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                      <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                  </ul>
              </div>
          </div>
    </li>`
    addBox.insertAdjacentHTML('afterend', liTag)
  })
}
showNotes()

addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let titleValue = inputTitle.value
  let descriptionValue = inputDesc.value
  if (titleValue || descriptionValue) {
    const d = new Date()
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

    let noteInfo = {
      title: titleValue,
      description: descriptionValue,
      date: `${month} ${date}, ${year}`,
    }

    if (!isUpdate) {
      notes.push(noteInfo)
    } else {
      isUpdate = false
      notes[updateId] = noteInfo
    }
    localStorage.setItem('notes', JSON.stringify(notes))
    closeIcon.click()
    showNotes()
  }
})

function showMenu(elem) {
  elem.parentElement.classList.add('show')
  document.addEventListener('click', (e) => {
    if (e.target.tagName != 'I' || e.target != elem) {
      elem.parentElement.classList.remove('show')
    }
  })
}

function deleteNote(noteId) {
  let confirmDelete = confirm('Are you sure you want to Delete this Note!')
  if (!confirmDelete) return

  notes.splice(noteId, 1)
  localStorage.setItem('notes', JSON.stringify(notes))
  showNotes()
}

function updateNote(noteId, title, desc) {
  isUpdate = true
  updateId = noteId
  addBox.click()
  inputTitle.value = title
  inputDesc.value = desc
  addBtn.innerText = 'Update Note'
  popupTitle.innerText = 'Update a Note'
  localStorage.setItem('notes', JSON.stringify(notes))
}
