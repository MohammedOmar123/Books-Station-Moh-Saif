const input = document.querySelector('.search-input');
const submit = document.querySelector('.search-btn');
const autoContainer = document.querySelector('.auto-Complete-container')
const cards = document.querySelector('.cards')
const suggestions = document.querySelectorAll('.book-suggestions')

const renderAutoSuggest = (data) => {
  autoContainer.textContent = ''
  data.forEach(ele => {
    const p = document.createElement('p');
    p.textContent = ele['bookName']
    p.classList.add('book-suggestions');
    p.addEventListener('click',(e) => {
      getDataFromApi(e,e.target.textContent);
      input.value = e.target.textContent;
    })
    autoContainer.appendChild(p)
  })
}

const renderBooks = (data) => {
  cards.textContent = ''
  data.items.forEach(ele => {
    const card = document.createElement('div')
    card.classList.add('card')

    const img = document.createElement('img')
    
    img.src = ele.volumeInfo.imageLinks.thumbnail
    img.alt = ele.volumeInfo.title

    // Language
    const pLang = document.createElement('p')
    pLang.classList.add('lang')
    pLang.textContent = 'Language : '


    const spanLang = document.createElement('span')
    spanLang.textContent = ele.volumeInfo.language
    pLang.appendChild(spanLang)

    // Title
    const pTitle = document.createElement('p')
    pTitle.classList.add('title')
    pTitle.textContent = 'Title : '


    const spanTitle = document.createElement('span')
    spanTitle.textContent = ele.volumeInfo.title
    pTitle.appendChild(spanTitle)

    // publish
    const pPublish = document.createElement('p')
    pPublish.classList.add('Publish')
    pPublish.textContent = 'Publish : '


    const spanPublish = document.createElement('span')
    spanPublish.textContent = ele.volumeInfo.publishedDate
    pPublish.appendChild(spanPublish)

    // button
    const btn = document.createElement('button')
    btn.classList.add('btn')

    const aLink = document.createElement('a')
    aLink.href = ele.volumeInfo.infoLink
    aLink.textContent = 'Check The Book'
    btn.appendChild(aLink)

    card.appendChild(img)
    card.appendChild(pLang)
    card.appendChild(pTitle)
    card.appendChild(pPublish)
    card.appendChild(btn)

    cards.appendChild(card)


  })
}

const getDataFromApi = (e,bookName) => {
  e.preventDefault();
  autoContainer.textContent = '';
  if (!bookName) {
    return;
  }
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
  fetchData(url, (data) => {
    renderBooks(data);
  })
}


input.addEventListener('input', () => {
  fetchData(`/books/${input.value}`,
    data => {
      renderAutoSuggest(data)
    })
})

submit.addEventListener('click', (e) => {
getDataFromApi(e,input.value);  
})

