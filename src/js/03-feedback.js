import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector("[name='email']"),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function checkForm() {
  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert('Всі поля повинні бути заповнені');
  }
}

function onFormSumbit(e) {
  e.preventDefault();

  checkForm();
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}

function onFormInput(e) {
  try {
    const {
      elements: { email, message },
    } = e.currentTarget;

    const dataUser = {
      email: email.value,
      message: message.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(dataUser));
  } catch (error) {
    return;
  }
}

function populateTextarea() {
  const {
    elements: { email, message },
  } = refs.form;

  if (localStorage.getItem('feedback-form-state')) {
    const savedMessage = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    email.value = savedMessage.email;
    message.value = savedMessage.message;
  }
}
