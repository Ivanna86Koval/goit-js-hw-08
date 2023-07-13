import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector("[name='email']"),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

initPage();

function checkForm() {
  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert('Всі поля повинні бути заповнені');
  }
}

function onFormSumbit(e) {
  e.preventDefault();

  checkForm();
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

function initPage() {
  const saveData = localStorage.getItem('feedback-form-state');
  if (saveData) {
    const saveDataParse = JSON.parse(saveData);
    Object.entries(saveDataParse).forEach(([name, value]) => {
      refs.form[name].value = value;
    });
  }
}

function onFormInput(e) {
  const { name, value } = e.target;
  let formData = localStorage.getItem('feedback-form-state');
  if (formData) {
    formData = JSON.parse(formData);
  } else {
    formData = {};
  }
  formData[name] = value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', formDataJSON);
}
