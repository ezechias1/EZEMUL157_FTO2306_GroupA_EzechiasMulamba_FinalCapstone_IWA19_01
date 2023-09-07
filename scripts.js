// Initialize variables
matches = books; // Initialize 'matches' with the 'books' array
page = 1; // Initialize 'page' to 1

// Check for errors in input data
if (!books || !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');

// Define color schemes for day and night
day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

// Create a document fragment to store elements
fragment = document.createDocumentFragment();

// Extract the first 36 items from 'matches'
const extracted = matches.slice(0, 36);

// Loop through extracted items and create previews
for (let i = 0; i < extracted.length; i++) {
    const { author, image, title, id } = extracted[i];
    const preview = createPreview({
        author,
        id,
        image,
        title
    });

    // Append the preview to the document fragment
    fragment.appendChild(preview);
}

// Append the document fragment to 'data-list-items'
data-list-items.appendChild(fragment);

// Create document fragments for genres and authors
genres = document.createDocumentFragment();
authors = document.createDocumentFragment();

// Create an option for all genres
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genres.appendChild(element);

// Create an option for all authors
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authors.appendChild(element);

// Loop through genre and author data and create options
for (const [value, text] of Object.entries(genres)) {
    element = document.createElement('option');
    element.value = value;
    element.innerText = text;
    genres.appendChild(element);
}

for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authors.appendChild(element);
}

// Append the genre and author options to their respective containers
data-search-genres.appendChild(genres);
data-search-authors.appendChild(authors);

// Define CSS color schemes for day and night
const css = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    },
};

// Get the root element of the document
const dataElement = document.documentElement;

// Determine the initial color scheme based on system preference
const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

// Set the initial CSS variables for color scheme
dataElement.style.setProperty('--color-dark', css[isDarkTheme].dark);
dataElement.style.setProperty('--color-light', css[isDarkTheme].light);

// Update the "Show more" button text and disabled state
data-list-button.textContent = `Show more (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})`;
data-list-button.disabled = !(matches.length - (page * BOOKS_PER_PAGE) > 0);

// Add event listeners to various elements
data-search-cancel.addEventListener('click', () => {
    data-search-overlay.open = false;
});

data-settings-cancel.addEventListener('click', () => {
    document.querySelector(data-settings-overlay).open = false;
});

data-settings-form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    dataElement.style.setProperty('--color-dark', css[result.theme].dark);
    dataElement.style.setProperty('--color-light', css[result.theme].light);
    document.querySelector(data-settings-overlay).open = false;
});

data-list-close.addEventListener('click', () => {
    data-list-active.open = false;
});

data-list-button.addEventListener('click', () => {
    // Calculate the range of items to display on the next page
    const startIndex = page * BOOKS_PER_PAGE;
    const endIndex = (page + 1) * BOOKS_PER_PAGE;
    
    // Create a fragment for new previews
    const previewsFragment = createPreviewsFragment(matches.slice(startIndex, endIndex));
    
    // Append the new previews to the list
    data-list-items.appendChild(previewsFragment);
    
    // Update the remaining item count
    actions.list.updateRemaining();
    
    // Increment the page number
    page = page + 1;
});

data-header-search.addEventListener('click', () => {
    data-search-overlay.open = true;
});

data-header-settings.addEventListener('click', () => {
    document.querySelector(data-settings-overlay).open = true;
});

data-list-active.addEventListener('click', () => {
    data-list-overlay.open = true;
});

data-search-overlay.addEventListener('search', () => {
    const formData = new FormData(data-search-form);
    const result = Object.fromEntries(formData);
    
    // Filter the 'books' array based on search criteria
    matches = books.filter((book) => {
        return (
            (result.title === 'any' || book.title.toLowerCase().includes(result.title.toLowerCase())) &&
            (result.author === 'any' || book.author.id === result.author) &&
            (result.genre === 'any' || book.genres.includes(result.genre))
        );
    });
    
    // Reset the page number to 1
    page = 1;
    
    // Remove existing previews
    data-list-items.innerHTML = '';
    
    // Create and append previews for the filtered results
    const previewsFragment = createPreviewsFragment(matches.slice(0, 36));
    data-list-items.appendChild(previewsFragment);
    
    // Update the "Show more" button and remaining item count
    actions.list.updateRemaining();
    
    // Close the search overlay
    data-search-overlay.open = false;
});