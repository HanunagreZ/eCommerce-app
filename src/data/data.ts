export const constants = {
  registration: {
    formTitle: 'Create an account',
    haveAccount: 'Already have an account?',
    loginLink: ' Log in',
    generalData: [
      {
        labelText: 'Email',
        clueText: 'A properly formatted email address (e.g., example@email.com)',
        reg: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      },
      {
        labelText: 'Password',
        clueText: 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      },
      {
        labelText: 'First name',
        clueText: 'Must contain at least one character and no special characters or numbers',
        reg: /^[A-Za-z]+$/,
      },
      {
        labelText: 'Last name',
        clueText: 'Must contain at least one character and no special characters or numbers',
        reg: /^[A-Za-z]+$/,
      },
    ],
    dateOfBirth: {
      labelText: 'Date of birth',
      clueText: 'Date format: DD.MM.YYYY. You must be above 13 years old.',
    },
    billingAddr: 'Billing address:',
    shippingAddr: 'Shipping address:',
    checkboxDefault: 'save as default',
    country: 'Country',
    countries: ['United States of America', 'Canada'],
    addressData: [
      {
        labelText: 'City',
        clueText: 'Must contain at least one character and no special characters or numbers',
        reg: /^[a-zA-Z\s]+$/,
      },
      {
        labelText: 'Street',
        clueText: 'Must contain at least one character',
        reg: /^.+$/,
      },
      {
        labelText: 'Postal code',
        clueText: 'Format is 12345 or 12345-6789',
        reg: /^\d{5}(?:-\d{4})?$/,
      },
    ],
    postalCodes: {
      'United States of America': {
        clueText: 'Format is 12345 or 12345-6789',
        reg: /^\d{5}(?:-\d{4})?$/,
        countryCode: 'US',
      },
      Canada: {
        clueText: 'Format is A1B 2C3',
        reg: /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/,
        countryCode: 'CA',
      },
    },
    checkboxSameAddr: 'same as billing',
    buttonTitle: 'Register',
  },
  login: {
    formTitle: 'Log in',
    haveAccount: 'Don`t have an account?',
    loginLink: ' Sign up',
    generalData: [
      {
        labelText: 'Email address',
        clueText: 'A properly formatted email address (e.g., example@email.com)',
        reg: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      },
      {
        labelText: 'Password',
        clueText: 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      },
    ],
    buttonTitle: 'Log in',
  },
};

export const modalProps = {
  modalEmail: {
    icon: 'assets/icons/iconError.svg',
    title: 'This email is already in use',
    description: 'Please log in or use another email',
    btn: 'Back',
    addEvent: () => {
      console.log('Test');
    },
  },
  modalPassword: {
    icon: 'assets/icons/iconError.svg',
    title: 'Incorrect password!',
    description: 'Please use correct password',
    btn: 'Back',
    addEvent: () => {
      console.log('Test2');
    },
  },
  modalServerError: {
    icon: 'assets/icons/iconAlert.svg',
    title: 'Something went wrong',
    description: 'Please try again',
    btn: 'Back',
    addEvent: () => {
      console.log('Test3');
    },
  },
  modalSuccess: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Welcome!',
    description: 'Account successfully created',
    btn: 'Go to main page',
    addEvent: () => {
      location.href = '/';
    },
  },
};
