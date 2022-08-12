const input = document.querySelector('.search-input');
const submit = document.querySelector('.search-btn');

const renderAutoSuggest = (data) => {
    const autoContainer = document.querySelector('.auto-Complete-container')
    autoContainer.textContent = '' 
    data.forEach(ele => {
      const p = document.createElement('p')
      p.textContent = ele['bookName']
      autoContainer.appendChild(p)
    })
}

input.addEventListener('input', () => {
    fetchData(`/books/${input.value}`,
        data => {
            renderAutoSuggest(data)
        })
})