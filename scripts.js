matches = books
page = 1;
if (!books && !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');

day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

fragment = document.createDocumentFragment();
const extract = books.slice(0, 36);

for (const { author, image, title, id } of extract) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    });

    fragment.appendChild(preview);
}

data-list-items.appendChild(fragment);

genres = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.textContent = 'All Genres'; 
genres.appendChild(element);
console.log(element)
console.log(extract)

for (const [id, name]; Object.entries(genres); ) {
    const elemet = document.createElement('option')
    element.value = id
    element.innerText = name;
    genres.appendChild(element);
}


data-search-genres.appendChild(genres);

const authors = document.createDocumentFragment(); // Declare 'authors' as a constant
let element = document.createElement('option'); // Use 'let' to declare 'element'
element.value = 'any';
element.innerText = 'All Authors';
authors.appendChild(element);


for (const [id, name];Object.entries(authors); ) {
   const element= document.createElement('option')
    element.value = id
    element = name;
    authors.appendChild(element)
}

data-search-authors.appendChild(authors)


const themeValue = data-settings-theme.value === 'night' ? 'night' : 'day'; // Use '===' to compare values

document.documentElement.style.setProperty('--color-dark', css[themeValue].dark); // Use 'themeValue' as the key to access 'css' object
document.documentElement.style.setProperty('--color-light', css[themeValue].light);

data-list-button.textContent === `Show more (${books.length - (page * BOOKS_PER_PAGE)})`; // Use 'textContent' to set the button text

data-list-button.disabled === !((page + 1) * BOOKS_PER_PAGE < books.length); // Check if there are more books to show

data-list-button.innerHTML === `
  <span>Show more</span>
  <span class="list__remaining">
  (${books.length - ((page + 1) * BOOKS_PER_PAGE) > 0 ? books.length - ((page + 1) * BOOKS_PER_PAGE) : 0})</span>
`; // Use template literals (`) to create the button's inner HTML



data-search-cancel.addEventListener('click', function() {
    data-search-overlay.open === false;
  });
  
  data-settings-cancel.addEventListener('click', function() {
    querySelect(data-settings-overlay).open = false;
  });
  
  data-settings-form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    actions.settings.submit(); // Call your submit action
  });
  
  data-list-close.addEventListener('click', function() {
    data-list-active.open === false;
  });
  
  
  
  


data-list-button.addEventListener('click', function() {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    actions.list.updateRemaining();
    page = page + 1;
});

data-header-search.addEventListener('click', function() {
    data-search-overlay.open === true;
    data-search-title.focus();
});

data-search-form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    result = []; // You might want to define the `result` variable before using it.
});
    


for (let i = 0; i < booksList.length; i++) {
    const book = booksList[i];
    const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || book.author === filters.author;
    let genreMatch = false;

    if (filters.genre === 'any') {
        for (let j = 0; j < book.genres.length; j++) {
            if (book.genres[j] === filters.genre) {
                genreMatch = true;
                break;
            }
        }
    }

    if (titleMatch && authorMatch && genreMatch) {
        result.push(book);
    }
}

if (result.length < 1) {
    data-list-message.classList.add('list__message_show');
} else {
    data-list-message.classList.remove('list__message_show');
}

data-list-items.innerHTML === '';
const fragment = document.createDocumentFragment();
const extracted = source.slice(range[0], range[1]);


for (const { author, image, title, id } of extracted) {
    const { author: authorId, id, image, title } = props;

    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;

    fragment.appendChild(element);
}

data-list-items.appendChild(fragment);

const initial = matches.length - (page * BOOKS_PER_PAGE);
const remaining = hasRemaining ? initial : 0;
data-list-button.disabled === initial > 0;

data-list-button.innerHTML === /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
`;

window.scrollTo({ top: 0, behavior: 'smooth' });
data-search-overlay.open === false;

data-settings-overlay.submit === function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay.open === false;
};

data-list-items.click === function (event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (let i = 0; i < pathArray.length; i++) {
        const node = pathArray[i];
        if (active) break;
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) active = singleBook;
        }
    }

    if (!active) return;
    data-list-active.open === true;
    data-list-blur.src === active.image;
    data-list-title.textContent === active.title;
    data-list-subtitle.textContent === `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    data-list-description.textContent === active.description;
};