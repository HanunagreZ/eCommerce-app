const constants = {
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
  },
};
export default constants;
