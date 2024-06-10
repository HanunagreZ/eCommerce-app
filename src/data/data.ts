import header from '../components/Header/Header';
import router from '..';

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
        clueText:
          'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number, must not contain special characters',
        reg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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
    checkboxSameAddr: 'same as shipping',
    buttonTitle: 'Register',
  },
  login: {
    formTitle: 'Log in',
    haveAccount: 'Don`t have an account?',
    regLink: ' Sign up',
    generalData: [
      {
        labelText: 'Email address',
        clueText: 'A properly formatted email address (e.g., example@email.com)',
        reg: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      },
      {
        labelText: 'Password',
        clueText: 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        reg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      },
    ],
    buttonTitle: 'Log in',
  },
  404: {
    pageTitle: 'Page not found',
    pageText: 'Oops! The page you looking for does not exist',
    buttonTitle: 'Return to main',
  },
};

export const modalProps = {
  modalEmail: {
    icon: 'assets/icons/iconError.svg',
    title: 'This email is already in use',
    description: 'Please log in or use another email',
    btn: 'Back',
    addEvent: () => {},
  },
  modalUserChangeEmail: {
    icon: 'assets/icons/iconError.svg',
    title: 'This email is already in use',
    description: 'Please use another email. Fill out the form again',
    btn: 'Back',
    addEvent: () => {},
  },
  modalUserWrongCurrentPassword: {
    icon: 'assets/icons/iconError.svg',
    title: 'Please use correct password',
    description: 'The given current password does not match',
    btn: 'Back',
    addEvent: () => {},
  },
  modalUserChangePasswordSuccess: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Password succesfully changed',
    description: 'Write down your new password so you dont forget!',
    btn: 'Back',
    addEvent: () => {},
  },
  modalCredentialsNotFound: {
    icon: 'assets/icons/iconError.svg',
    title: 'Customer account with the given credentials not found',
    description: 'Use correct account data or sign up',
    btn: 'Back',
    addEvent: () => {},
  },
  modalPassword: {
    icon: 'assets/icons/iconError.svg',
    title: 'Incorrect password!',
    description: 'Please use correct password',
    btn: 'Back',
    addEvent: () => {},
  },
  modalServerError: {
    icon: 'assets/icons/iconAlert.svg',
    title: 'Something went wrong',
    description: 'Please try again',
    btn: 'Back',
    addEvent: () => {},
  },
  modalSuccess: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Welcome!',
    description: 'Account successfully created',
    btn: 'Go to main page',
    addEvent: () => {
      router.navigateTo('/');
      header.renderNav();
    },
  },
  modalSuccessUpdate: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Success',
    description: 'Information updated',
    btn: 'Back',
    addEvent: () => {},
  },
  modalSuccessNewAddress: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Success',
    description: 'Address add',
    btn: 'Back',
    addEvent: () => {},
  },
  modalSuccessDelete: {
    icon: 'assets/icons/iconSuccess.svg',
    title: 'Success',
    description: 'Address deleted',
    btn: 'Back',
    addEvent: () => {
      //router.navigateTo('/profile');
    },
  },
  modalIncorrectPromo: {
    icon: 'assets/icons/iconAlert.svg',
    title: 'Incorrect promocode',
    description: 'Please enter another promocode',
    btn: 'Back',
    addEvent: () => {},
  },
};

export const catalogTitles = {
  all: 'Show all',
  cartBtn: 'Add to cart',
  sortingOptions: ['Sort by', 'Name: A - Z', 'Name: Z - A', 'Price Low To High', 'Price High to Low'],
  filterOptions: ['Series', 'Marvel', 'Star Wars', 'Anime'],
  catalogOptions: ['Categories', 'Pop!', 'Accessories'],
  searchPlaceholder: 'Search...',
  searchRequest: 'Your search request: ',
  noSearchresults: 'No results found...',
};

export const mainAdBlock = {
  marvel: {
    containerClass: 'main__adBlock--spiderman',
    image: 'assets/main/spiderman.svg',
    imageClass: 'main__image--spiderman',
    blockClass: 'main__block--spiderman',
    title: 'CONNECT ON THE WEB',
    description: 'Collect New Achievements for Your Gaming Set with New Releases from Spider-Man 2.',
    btn: 'See collection',
    addEvent: () => {
      router.navigateTo('/catalog/pop/marvel');
    },
  },
  starwars: {
    containerClass: 'main__adBlock--starwars',
    image: 'assets/main/starwarsObiwan.svg',
    imageClass: 'main__image--starwars',
    blockClass: 'main__block--starwars',
    title: 'STAR WARS',
    description: 'Welcome This Exclusive Inu to Take Her Rightful Place in Your Inuyasha Collection.',
    btn: 'See collection',
    addEvent: () => {
      router.navigateTo('/catalog/pop/star-wars');
    },
  },
  anime: {
    containerClass: 'main__adBlock--anime',
    image: 'assets/main/inuyasha.svg',
    imageClass: 'main__image--anime',
    blockClass: 'main__block--anime',
    title: 'ANIME',
    description: 'Unleash the power of your soul.',
    btn: 'See collection',
    addEvent: () => {
      router.navigateTo('/catalog/pop/anime');
    },
  },
};

export const breadProps = {
  category: {
    href: ['/', '/catalog'],
    text: ['Funko', 'Catalog'],
  },
  pop: {
    href: ['/', '/catalog', '/catalog/pop'],
    text: ['Funko', 'Catalog', 'Pop!'],
  },
  accessories: {
    href: ['/', '/catalog', '/catalog/accessories'],
    text: ['Funko', 'Catalog', 'Accessories'],
  },
  anime: {
    href: ['/', '/catalog', '/catalog/pop', '/catalog/pop/anime'],
    text: ['Funko', 'Catalog', 'Pop!', 'Anime'],
  },
  starwars: {
    href: ['/', '/catalog', '/catalog/pop', '/catalog/pop/star-wars'],
    text: ['Funko', 'Catalog', 'Pop!', 'Star Wars'],
  },
  marvel: {
    href: ['/', '/catalog', '/catalog/pop', '/catalog/pop/marvel'],
    text: ['Funko', 'Catalog', 'Pop!', 'Marvel'],
  },
  cart: {
    href: ['/', '/cart'],
    text: ['Funko', 'Cart'],
  },
};

export const profile = {
  profileGeneralData: [
    {
      labelText: 'Email',
      clueText: 'A properly formatted email address (e.g., example@email.com)',
      reg: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
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
  passwords: [
    {
      labelText: 'Current password',
      clueText:
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number, must not contain special characters',
      reg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,

      //(?=.*[!@#$%^&*()\-_=+{};:'",.<>?]): Positive lookahead to ensure there is at least one special character
      // reg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:'",.<>?])(?!.*\s).{8,}$/,
    },
    {
      labelText: 'New password',
      clueText:
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number, must not contain special characters',
      reg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    },
  ],
  countries: {
    US: 'United States of America',
    CA: 'Canada',
    RS: 'RS',
  },

  countrCodes: {
    'United States of America': 'US',
    Canada: 'CA',
    RS: 'RS',
  },

  addressesTitle: 'Addresses:',
  defaultBillAdr: 'Default billing address',
  defaultShipAddr: 'Default shipping address',
  addNewAddresBtn: 'Add new Address',
};

export const cartTitles = {
  title: 'My Cart',
  clearBtn: 'CLEAR CART',
  colTitles: {
    itemCol: 'ITEM',
    quantityCol: 'QTY',
    totalCol: 'TOTAL',
  },
  promoTitle: 'HAVE A PROMO CODE?',
  promoPlaceholder: 'Enter promo code here',
  promoBtn: 'APPLY',
  summary: 'SUMMARY',
  subtotal: 'SUBTOTAL',
  shipping: 'SHIPPING',
  discounts: 'DISCOUNTS AND PROMO',
  total: 'TOTAL',
  empty: 'Cart is empty!',
  catalogBtn: 'Go shopping',
};

export const promocodes = {
  FUNKOALL5: '5e9000b5-22d2-4c4d-be2a-63f583835706',
  ANIMEALL10: '332b67b0-95e3-4965-84d5-53bc6c588220',
};
