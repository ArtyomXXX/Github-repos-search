const main = document.querySelector('.main');
const wrapper = document.createElement('div');

const form = document.createElement('form');
form.classList.add('search');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const request = Object.fromEntries(new FormData(e.target));


  if (request.name.length <= 3) {
    return searchResult.innerHTML = '<li>Enter more than 3 characters!</li>';
  }

    fetch(`https://api.github.com/search/repositories?q=${request.name}&per_page=10`)
    .then(response => response.json())
    .then(data => {
      if (data.total_count === null) {
        searchResult.innerHTML = '<li>Nothing found</li>';
        return ;
      }
      
      searchResult.innerHTML = '';
      data.items.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.html_url;
        link.target = '_blank';
        link.textContent = item.name;
        li.appendChild(link);
        const desc = document.createElement('p');
        desc.textContent = item.description || 'No project description';
        li.appendChild(desc);
        searchResult.appendChild(li);
      });
    }).catch(() => searchResult.innerHTML = '<li>Error loading data<li>');
});

// Строка поиска

const searchInput = document.createElement('input');
searchInput.classList.add('search-input');
searchInput.setAttribute('name', 'name');
searchInput.placeholder = "Repository's name..."

// Кнопка отправки запроса

const searchButton = document.createElement('button');
searchButton.classList.add('search-button');
searchButton.setAttribute('type', 'submit');
searchButton.innerHTML="Search";

form.appendChild(searchInput);
form.appendChild(searchButton);
main.appendChild(form);


// function createProfile(profileData) {
//     const element = document.createElement('div');
//     element.classList.add('search-result');
//     element.innerHTML = `
//     <p class="search-text"><span>Имя: </span>${profileData.name}</p>
//     `;

//     element.appendChild(createDeleteButton());
//     return element;
// }

// function createDeleteButton() {
//     const element = document.createElement('button');
//     element.classList.add('delete-button');
//     element.innerHTML = "Delete";
//     element.addEventListener('click', (e) => {
//         wrapper.innerHTML = '';
//     })

//     return element;
// }