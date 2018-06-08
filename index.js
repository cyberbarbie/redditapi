import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }
  // Clear field
  searchInput.value = '';
  //search Reddit
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      console.log(results);
      //display results in UI
      let output = '<div class="card-columns">';
      //loop through an array of posts
      results.forEach(post => {
        //check for image existence
        let image = post.preview ? post.preview.images[0].source.url : 'http://i.imgur.com/J8jGQt2.png';
        output += `
        <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Go somewhere</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-dark">Score: ${post.score}</span>

        </div>
        </div>
        `;
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
  });

  //clear
  e.preventDefault();

});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

//truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}
