import axios from 'axios';
import { ICustomerRegistration, ICustomerLogin } from './interfaces/interfaces';
import Modal from './components/modal/Modal';
import { modalProps } from './data/data';
import Router from './components/Router/Router';
import app from './components/App';
import { routes, routesRefresh } from './data/routesData';

class Api {
  private project_key = 'rs-ecommerce';
  private client_id = '2pvElnJONW2_md23HkzBb6v-';
  private secret = 'HTMoUsX6-87FhggEb11hD15mWcbvsYCe';
  private API_URL = 'https://api.australia-southeast1.gcp.commercetools.com';
  private Auth_URL = 'https://auth.australia-southeast1.gcp.commercetools.com';
  private accessToken = '';

  /*function getUserAccount() {
    return axios.get('/user/12345');
  }
  
  function getUserPermissions() {
    return axios.get('/user/12345/permissions');
  }
  
  Promise.all([getUserAccount(), getUserPermissions()])
    .then(function (results) {
      const acct = results[0];
      const perm = results[1];
    });*/

  createCustomer(payload: ICustomerRegistration) {
    const token = localStorage.getItem('accessToken');

    axios
      .post(`${this.API_URL}/rs-ecommerce/customers`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        new Modal(modalProps.modalSuccess);
        console.log(response + 'Зарегистрировали пользователя');
        localStorage.setItem('userName', response.data.customer.firstName);
      })
      .then((response) => {
        const payload2 = {
          email: payload.email,
          password: payload.password,
        };
        console.log(response);
        this.obtainTokens(payload2);
      })
      .catch(function (error) {
        if (error.response.data.message === 'There is already an existing customer with the provided email.') {
          new Modal(modalProps.modalEmail);
        }
      });
  }

  getAccessToken() {
    axios
      .post(
        `${this.Auth_URL}/oauth/token?grant_type=client_credentials`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      )
      .then((response) => {
        console.log(response + 'Получили обычный токен');
        localStorage.setItem('accessToken', response.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  login(payload: ICustomerLogin) {
    const token = localStorage.getItem('accessToken');
    axios
      .post(`${this.API_URL}/${this.project_key}/login`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: 'keep-alive',
        },
      })
      .then((response) => {
        console.log(response);
        console.log(1);
        this.obtainTokens(payload);
        localStorage.setItem('userName', response.data.customer.firstName);
        setTimeout(() => {
          location.href = '/';
        }, 2000);
        return response;
      })
      .then((response) => {})
      .catch(function (error) {
        if (error.response.data.message === 'Account with the given credentials not found.') {
          new Modal(modalProps.modalCredentialsNotFound);
        }
        console.log(error);
      });
  }

  obtainTokens(payload: ICustomerLogin) {
    axios
      .post(
        `${this.Auth_URL}/oauth/${this.project_key}/customers/token?grant_type=password&username=${payload.email}&password=${payload.password}`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      )
      .then((response) => {
        console.log('Получили персональные токены');
        localStorage.setItem('refreshToken', response.data.refresh_token);
        localStorage.setItem('accessToken', response.data.access_token);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  isRefreshCoockieExist() {
    if (localStorage.getItem('refreshToken')) {
      console.log('Рефреш токен есть');
      new Router(app.get(), routesRefresh);
      return;
    } else {
      console.log('Рефреш токена нет');
      new Router(app.get(), routes);
      this.getAccessToken();
      //localStorage.removeItem('userName');
    }
  }
}
const api = new Api();

export default api;
