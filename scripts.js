import { BOOKS_PER_PAGE, books, authors, genres } from './data.js';

const documentBody = document.querySelector('body');
const matches = books
let page = 1;
let day = {
	dark: '10, 10, 20',
	light: '255, 255, 255',
}
let night = {
	dark: '255, 255, 255',
	light: '10, 10, 20',
}
let genre = document.createDocumentFragment()
let element = document.createElement('option')
let result;
let extracted = books.slice(0, 36);
var fragment = document.createDocumentFragment()



window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	? `${night}` | `${day}`
	: documentBody.style.setProperty('--color-dark', night)
	| documentBody.style.setProperty('--color-light', day);

//data attributes - not sure if LET is appropriate - assumption based on lower down reassigning
//The div which contains all your card items preview
let dataItems = documentBody.querySelector('[data-list-item]');
//bottom button
let dataButton = documentBody.querySelector('[data-list-button]');
//cancel button in search dialog
let dataSearchCancel = documentBody.querySelector('[data-search-cancel]');
//cancel button in settings
let dataSettingsCancel = documentBody.querySelector('[data-settings-cancel]');
//search by genre button

// You can go to the html and find the rest ;) I already declared them for you,
// and there are some examples of how to use them as well.
let dataSearchGenres = documentBody.querySelector('[data-search-genres]');
let dataSearchAuthors = documentBody.querySelector('[data-search-authors]');
let dataSettingTheme = documentBody.querySelector('[data-settings-theme]');
let dataHeaderSearch = documentBody.querySelector('[data-header-search]');
let dataSearchOverlay = documentBody.querySelector('[data-search-overlay]');
let dataSettingsForm = documentBody.querySelector('[data-settings-form]');
let dataListClose = documentBody.querySelector('[data-list-close]');
let dataListActive = documentBody.getAttribute('[ data-list-active]');
let dataSearchForm = documentBody.getAttribute('[data-search-form]');
let dataSettingsOverlay = documentBody.getAttribute('[data-settings-overlay]');
let dataSubtitle = documentBody.getAttribute('[data-list-subtitle]');
let dataDescription = documentBody.getAttribute('[data-list-description]');
let dataListMessage = documentBody.getAttribute('[data-list-message]');
let dataTitle = documentBody.getAttribute('[data-list-title]');
let dataBlur = documentBody.getAttribute('[data-list-blur]');
let dataImage = documentBody.getAttribute('[data-list-image]');


let listItemsDiv = document.querySelector('.list__items')



if (!books && !Array.isArray(books)) {
	
	listItemsDiv.innerHtml += `<div style="display:flex;align-items:center:justify-content:center;"></div>Source required`;
	throw new Error('Source required')
}
if (!extracted && extracted.length < 2) {
	throw new Error('Range must be an array with two numbers')
}

// this returns the card item you see in the DOM, it's supposed to be a clickable button
// which opens a modal/dialog
const createPreview = (items) => {
	const mappedList = [items].map(item => {

		//this is a simple lookup which will find the author
		// notice in the Author object in your data file, is a GUID
		// It matches the same as in the book.author ID,
		return `
			<img class="preview__image" src="${item.image}"/>
				<div class="preview__info">
				    <h3 class="preview__title">${item.title}</h3>
				    <div class="preview__author">${authors[item.author]}</div>
				</div>
			`
	})

	return mappedList;
}

for (let item of extracted) {
	// need to figure out the create preview function.
	// could most probably be a function that takes in the extracted list
	// mapped over and returned into the cards.
    const previewCardContainer = document.createElement('button')
	const preview = createPreview({
		...item
	})

	previewCardContainer.classList = 'preview'
	previewCardContainer.setAttribute('data-preview', item.id)
	previewCardContainer.innerHTML += preview

	console.log(item)

	listItemsDiv.appendChild(previewCardContainer)
}


dataButton.innerHTML = `Show more ${(books.length - BOOKS_PER_PAGE)}`
dataButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0);
// 
dataHeaderSearch.addEventListener('click', () => {
	dataSearchOverlay.open = true
});
dataSearchCancel.addEventListener('click', () => dataSearchOverlay.open = false);




// Search is pretty basic
function searchForm(input) {
	preventDefault()// tells the chrome not to reload the page 
	const formData = new FormData(event.target)
	const filters = Object.fromEntries(formData)
	result = []

	for (book; booksList; i++) {
		titleMatch = filters.title.trim() = '' && books.title.toLowerCase().includes[filters.title.toLowerCase()]
		authorMatch = filters.author = 'any' || books.author === filters.author

		{
			genreMatch = filters.genre = 'any'
			for (genre; books.genres; i++) { if (singleGenre === filters.genre) { genreMatch === true } }
		}
	}
    

if (titleMatch && authorMatch && genreMatch) result.push(book)
 }
 