import Button from './ui-components/Button/Button';
import api from './Api';

import './styles.scss';

const accessBtn = new Button('Access', 'access-btn', document.body);
accessBtn.addListener(() => {
  api.obtainAccessToken();
});

const q = {
  email: 'johndoe122@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'secret123',
};

const createBtn = new Button('create user', 'access-btn', document.body);
createBtn.addListener(() => {
  api.createCustomer(q);
});
