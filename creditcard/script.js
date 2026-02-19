const form = document.querySelector('#cardForm');
const errorsEl = document.querySelector('.errors');
const successMsg = document.querySelector('#successMsg');

function showErrors(list) {
  errorsEl.textContent = list.join('\n');
}

function clearMessages() {
  errorsEl.textContent = '';
  successMsg.classList.add('hide');
}

function isExactCardNumber(num) {
  return num === '1234123412341234';
}

function isExpired(mm, yy) {
  const month = Number(mm);
  const year = Number(yy);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const fullYear = 2000 + year;

  if (fullYear < currentYear) return true;
  if (fullYear === currentYear && month < currentMonth) return true;

  return false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearMessages();

  const cardNumber = document.querySelector('#cardNumber').value.trim();
  const holder = document.querySelector('#cardHolder').value.trim();
  const month = document.querySelector('#month').value.trim();
  const year = document.querySelector('#year').value.trim();
  const cvc = document.querySelector('#cvc').value.trim();

  let problems = [];

  // Required checks (because we used novalidate)
  if (!cardNumber) problems.push('Card number is required');
  if (!holder) problems.push('Card holder is required');
  if (!month) problems.push('Expiration month is required');
  if (!year) problems.push('Expiration year is required');
  if (!cvc) problems.push('CVC is required');

  // Specific validation
  if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
    problems.push('Card number must be exactly 16 digits');
  } else if (cardNumber && !isExactCardNumber(cardNumber)) {
    problems.push('Card number is not valid (must be 1234123412341234)');
  }

  if (month && !/^(0[1-9]|1[0-2])$/.test(month)) {
    problems.push('Expiration month must be 01 to 12');
  }

  if (year && !/^\d{2}$/.test(year)) {
    problems.push('Expiration year must be 2 digits');
  }

  if (cvc && !/^\d{3,4}$/.test(cvc)) {
    problems.push('CVC must be 3 to 4 digits');
  }

  if (
    problems.length === 0 &&
    /^(0[1-9]|1[0-2])$/.test(month) &&
    /^\d{2}$/.test(year)
  ) {
    if (isExpired(month, year)) problems.push('Card is expired');
  }

  if (problems.length) {
    showErrors(problems);
    return;
  }

  // Success feedback
  successMsg.classList.remove('hide');
  form.reset();
});

