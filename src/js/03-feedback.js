const refs = {
  form: document.querySelector('.feedback-form'),
};

const throttle = require('lodash.throttle');
refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);

const formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function onInput(e) {
  const nameInput = e.target.name;
  formData[nameInput] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Return value from localStorage
Object.entries(formData).map(el => {
  for (let i = 0; i < refs.form.length; i += 1) {
    if (refs.form[i].name === el[0]) {
      refs.form[i].value = el[1];
    }
  }
});

function onSubmit(e) {
  e.preventDefault();
  console.log(formData);
  localStorage.clear();
  for (let i = 0; i < refs.form.length; i += 1) {
    refs.form[i].value = '';
  }
}
