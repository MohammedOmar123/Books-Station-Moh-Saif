const input = document.querySelector('.search-input');
const submit = document.querySelector('.search-btn');
const autoContainer = document.querySelector('.auto-Complete-container')
const cards = document.querySelector('.cards')

const renderAutoSuggest = (data) => {
  autoContainer.textContent = ''
  data.forEach(ele => {
    const p = document.createElement('p');
    p.textContent = ele['bookName']
    p.classList.add('book-suggestions');
    p.addEventListener('click', (e) => {
      getDataFromApi(e, e.target.textContent);
      input.value = e.target.textContent;
    })
    autoContainer.appendChild(p)
  })
}



const renderBooks = (data) => {

  cards.textContent = ''
  data.items.forEach(ele => {
    if (ele.volumeInfo.imageLinks) {
      // card
      const card = document.createElement('div')
      card.classList.add('card')

      // img
      const img = document.createElement('img')
      img.src = ele.volumeInfo.imageLinks.thumbnail
      img.alt = ele.volumeInfo.title

      // card-content
      const cardContent = document.createElement('div')
      cardContent.classList.add('card-content')

      // Language
      const pLang = document.createElement('p')
      pLang.classList.add('lang')
      pLang.textContent = 'Language : '


      const spanLang = document.createElement('span')
      spanLang.textContent = ele.volumeInfo.language
      pLang.appendChild(spanLang)

      // Title
      const pTitle = document.createElement('h3')
      pTitle.classList.add('title')
      pTitle.textContent = ele.volumeInfo.title


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
      aLink.textContent = 'Read Now'
      btn.appendChild(aLink)

      cardContent.appendChild(pTitle)
      cardContent.appendChild(pLang)
      cardContent.appendChild(pPublish)
      cardContent.appendChild(btn)


      card.appendChild(img)
      card.appendChild(cardContent)

      cards.appendChild(card)

    }
  })
}

const getDataFromApi = (e, bookName) => {
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
  if (input.value) {
    fetchData(`/books/${input.value}`,
      data => {
        renderAutoSuggest(data)
      })
  }else{
    autoContainer.textContent = ''
  }
})

submit.addEventListener('click', (e) => {
  getDataFromApi(e, input.value);
})

