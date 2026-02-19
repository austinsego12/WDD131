const theForm = document.querySelector('#checkoutForm');
const paymentSelect = document.querySelector('#paymentMethod');

const creditCardContainer = document.querySelector('#creditCardNumberContainer');
const paypalContainer = document.querySelector('#paypalUsernameContainer');

const creditInput = document.querySelector('#creditCardNumber');
const paypalInput = document.querySelector('#paypalUsername');

const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

function displayError(msg) {
  document.querySelector('.errors').textContent = msg;
}

function isCardNumberValid(number) {
  return number === '1234123412341234';
}

function togglePaymentDetails(e) {
  const value = e.target.value;

  creditCardContainer.classList.add('hide');
  paypalContainer.classList.add('hide');

  creditInput.required = false;
  monthInput.required = false;
  yearInput.required = false;
  paypalInput.required = false;

  if (value === 'creditCard') {
    creditCardContainer.classList.remove('hide');
    creditInput.required = true;
    monthInput.required = true;
    yearInput.required = true;
  } else if (value === 'paypal') {
    paypalContainer.classList.remove('hide');
    paypalInput.required = true;
  }

  paymentSelect.setAttribute('aria-expanded', value ? 'true' : 'false');
}

paymentSelect.addEventListener('change', togglePaymentDetails);

function submitHandler(event) {
  event.preventDefault();

  displayError('');
  let errors = [];

  // Basic required checks (since we used novalidate)
  const fullName = document.querySelector('#fullName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const address = document.querySelector('#address').value.trim();

  if (!fullName) errors.push('Full name is required');
  if (!email) errors.push('Email is required');
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.push('Email format is not valid');
  if (!address) errors.push('Address is required');

  if (!paymentSelect.value) {
    errors.push('Please select a payment method');
  }

  if (paymentSelect.value === 'creditCard') {
    const cardNum = creditInput.value.trim();
    const expMonth = Number(monthInput.value);
    const expYear = Number(yearInput.value);

    if (!/^\d{16}$/.test(cardNum)) {
      errors.push('Card number must be 16 digits');
    } else if (!isCardNumberValid(cardNum)) {
      errors.push('Card number is not valid');
    }

    if (!Number.isInteger(expMonth) || expMonth < 1 || expMonth > 12) {
      errors.push('Expiration month must be 01 to 12');
    }

    if (!Number.isInteger(expYear) || expYear < 0 || expYear > 99) {
      errors.push('Expiration year must be 2 digits');
    }

    if (
      Number.isInteger(expMonth) &&
      expMonth >= 1 &&
      expMonth <= 12 &&
      Number.isInteger(expYear) &&
      expYear >= 0 &&
      expYear <= 99
    ) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const fullExpYear = 2000 + expYear;

      if (
        fullExpYear < currentYear ||
        (fullExpYear === currentYear && expMonth < currentMonth)
      ) {
        errors.push('Card is expired');
      }
    }
  }

  if (paymentSelect.value === 'paypal') {
    const paypalName = paypalInput.value.trim();
    if (!paypalName) errors.push('PayPal username is required');
  }

  if (errors.length) {
    displayError(errors.join('\n'));
    return;
  }

  // Show success message (matches video style)
  theForm.innerHTML = '<h2>Thank you for your purchase.</h2>';
}

theForm.addEventListener('submit', submitHandler);
