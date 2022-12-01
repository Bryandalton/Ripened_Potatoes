const newMovieFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#movie-title').value.trim();
    const description = document.querySelector('#movie-description').value.trim();
    const tag_id = document.querySelector('#tag').value.trim();
  
    if (title && description && tag_id) {
      const response = await fetch(`/api/movies`, {
        method: 'POST',
        body: JSON.stringify({ title, description, tag_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
        console.log(response)
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create thread');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete review');
      }
    }
  };


  document
    .querySelector('.new-movie-form')
    .addEventListener('submit', newMovieFormHandler);

    document
    .querySelector('.review-list')
    .addEventListener('click', delButtonHandler);