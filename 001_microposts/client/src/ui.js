class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.submitBtn = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
        `;
    });

    this.posts.innerHTML = output;
  }

  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.changeFormState('edit');
  }

  changeFormState(state) {
    if (state === 'edit') {
      this.submitBtn.textContent = 'Update Post';
      this.submitBtn.className = 'post-submit btn btn-warning btn-block';

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block mt-2';
      button.textContent = 'Cancel Edit';

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    } else {
      this.submitBtn.textContent = 'Post It';
      this.submitBtn.className = 'post-submit btn btn-primary btn-block';

      const cancelBtn = document.querySelector('.post-cancel');
      if (cancelBtn) {
        cancelBtn.remove();
      }

      this.clearIdInput();
      this.clearFields();
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    document.querySelector('#message').appendChild(div);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();
