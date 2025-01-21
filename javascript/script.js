const form = document.getElementById('form')
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password-confirm')
const birthday = document.getElementById('birth-day')

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error')
}

const isValidFirstName = firstName => {
  const regExpFirstName =  new RegExp("^[A-Za-zА-ЯЁа-яё]{1,20}$");
  return regExpFirstName.test(firstName);
}

const isValidLastName = lastName => {
  const regExpLastName =  new RegExp("^[A-Za-zА-ЯЁа-яё]{1,30}$");
  return regExpLastName.test(lastName);
}

const isValidEmail = email => {
  const regExpEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExpEmail.test(email);
}

const isValidPassword = password => {
  const regExpPassword =  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
  return regExpPassword.test(password);
}

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const birthdayValue = birthday.value.trim()

  const date = new Date(birthdayValue);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear()
  const monthDifference = today.getMonth() - date.getMonth();

  if (firstNameValue === '') {
    setError(firstName, 'Введите свое имя')
  } else if (!isValidFirstName(firstNameValue)) {
    setError(firstName, 'Используйте только буквы латиницы или киррилицы. Имя должно содержать от 1 до 20 символов.');
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === '') {
    setError(lastName, 'Введите свою фамилию')
  } else if (!isValidLastName(lastNameValue)) {
    setError(lastName, 'Используйте только буквы латиницы или киррилицы. Фамилия должна содержать от 2 до 30 символов.');
  } else {
    setSuccess(lastName);
  }

  if (emailValue === '') {
    setError(email, 'Введите свой E-mail')
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Пожалуйста, введите корректный электронный адрес. Убедитесь, что он содержит символ '@' и доменное имя, например, 'example.com'.");
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Введите пароль')
  } else if (passwordValue.length < 8) {
    setError(password, 'Длина пароля должна быть не менее 8 символов');
  } else if (!isValidPassword(passwordValue)) {
    setError(password, 'Пароль должен содержать минимум одну цифру, одну заглавную и строчную букву и один символ.');
  } else {
    setSuccess(password);
  }

  if (password2Value === '') {
    setError(password2, 'Пароли не совпадают')
  } else if (password2Value !== passwordValue) {
    setError(password2, 'Пароли не совпадают');
  } else {
    setSuccess(password2);
  }

  if (birthdayValue === '') {
    setError(birthday, 'Введите дату рождения')
  } else if (age < 18 || (age !== 18 && monthDifference >= 0)) {
    setError(birthday, 'Вы должны быть старше 18 лет для регистрации')
  } else {
    setSuccess(birthday);
  }
}