const placeholders = document.querySelectorAll('.placeholder')
let store = localStorage.getItem('key')
const item = document.createElement('div');
item.classList.add('item');
item.setAttribute('draggable', true)
item.innerHTML = 'перетащи меня'

function dragstart({target}) {
  target.classList.add('hold');
  target.closest('.placeholder').setAttribute('data-atr', false)
  localStorage.setItem('key', target.closest('.placeholder').getAttribute('data-atr'))
  setTimeout(() => {
    target.classList.add('hide')
  }, 0)
}

function dragend({target}) {
  target.className = 'item';
  target.closest('.placeholder').setAttribute('data-atr', true);
  localStorage.setItem('key', target.closest('.placeholder').getAttribute('data-atr'))
}

function dragover(evt) {
  evt.preventDefault()
}

function dragenter({target}) {
  target.classList.add('hovered')
}

function dragleave({target}) {
  target.classList.remove('hovered')
}

function dragDrop({target}) {
  target.classList.remove('hovered')
  target.append(item)

  placeholders.forEach((placeholder, i) => {
    placeholder.removeAttribute('data-atr')
  })
}

function initDragEvents() {
  item.addEventListener('dragstart', dragstart);
  item.addEventListener('dragend', dragend);
  placeholders.forEach((placeholder, i) => {
    placeholders[0].append(item)
    placeholder.setAttribute('data-atr', store)
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', dragDrop)
  })
}

initDragEvents()
