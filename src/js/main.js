/*************************
 * 
 * Show/Hide plant details
 * 
 *************************/
const buttons = Array.from(document.querySelectorAll('.js-read-more'))

buttons.map((button) => button.addEventListener('click', (e) => {
  const activeButton = e.target
  const description = activeButton.previousElementSibling;
  const plantName = e.target.closest('article').dataset.name

  if (description.classList.contains('hide')) {
    description.classList.replace('hide', 'show')
    activeButton.textContent = `Hide ${plantName} details`
  } else if (description.classList.contains('show')) {
    description.classList.replace('show', 'hide')
    activeButton.textContent = `See ${plantName} details`
  }
}))

/*************************
 * 
 * Search
 * 
 *************************/

const plantNames = Array.from(document.querySelectorAll('.card__title')).map((plant) => (
  plant.textContent
))
const plantDescriptions = Array.from(document.querySelectorAll('.card__description')).map((plant) => (
  plant.textContent
))
const textToSearch = Array.from(plantNames.map((plant, i) => (
  {name: plant.toLowerCase(), description: plantDescriptions[i]}
)))

const resetButton = document.querySelector('.search__reset-btn')
const searchInput = document.querySelector('#search')
const searchResults = document.querySelector('.search__results')
const allPlants = document.querySelectorAll('.card--plant')

resetButton.addEventListener('click', (e) => {
  searchResults.textContent = ''
  allPlants.forEach((plant) => {
    if (plant.classList.contains('hide')) {
      plant.classList.remove('hide')
      plant.classList.add('show')
    }
  })
})


searchInput.addEventListener('input', (e) => {
  const input = e.target
  const inputValue = input.value.trim().toLowerCase()
  const matches = [] 
  let resultsText = ''

  textToSearch.forEach((plant) => {
    if (plant.name.includes(inputValue) || plant.description.includes(inputValue)) {
      matches.push(plant.name)
    }
  })

  if (matches.length > 0 && inputValue.length > 0) {
    
    allPlants.forEach((plant) => {
      if (!matches.includes(plant.dataset.name)) {
        plant.classList.replace('show', 'hide')
      } else if (matches.includes(plant.dataset.name) && plant.classList.contains('hide')) {
        plant.classList.replace('hide', 'show')
      }
      resultsText = `Showing ${matches.length} results`
    }) 

  } else if (matches.length == 0 && inputValue.length != 0) {

    resultsText = `There are no results for your search`
    allPlants.forEach((plant) => {
      plant.classList.replace('show', 'hide')
    })

  } else if (inputValue.length == 0) {
    resultsText = ''
  } else {
    resultsText = `Showing ${matches.length} results`
  }
  
  searchResults.textContent = resultsText
  
})
