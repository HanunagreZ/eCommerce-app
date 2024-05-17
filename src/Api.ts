import axios, { AxiosError } from 'axios';
import { ICustomerRegistration, ICustomerLogin } from './interfaces/interfaces';
import Modal from './components/modal/Modal';
import { modalProps } from './data/data';

class Api {
  private project_key = 'rs-ecommerce';
  private client_id = '2pvElnJONW2_md23HkzBb6v-';
  private secret = 'HTMoUsX6-87FhggEb11hD15mWcbvsYCe';
  private API_URL = 'https://api.australia-southeast1.gcp.commercetools.com';
  private Auth_URL = 'https://auth.australia-southeast1.gcp.commercetools.com';
  private accessToken = '';

  async getAccessToken() {
    try {
      const response = await axios.post(
        `${this.Auth_URL}/oauth/token?grant_type=client_credentials`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      );
      console.log('Получили обычный токен');
      localStorage.setItem('accessToken', response.data.access_token);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  }

  async obtainTokens(payload: ICustomerLogin) {
    try {
      const response = await axios.post(
        `${this.Auth_URL}/oauth/${this.project_key}/customers/token?grant_type=password&username=${payload.email}&password=${payload.password}`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      );

      console.log('Получили персональные токены');
      localStorage.setItem('refreshToken', response.data.refresh_token);
      localStorage.setItem('accessToken', response.data.access_token);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  }

  async createCustomer(payload: ICustomerRegistration) {
    try {
      const token = localStorage.getItem('accessToken');
      console.log(token);

      const response = await axios.post(`${this.API_URL}/rs-ecommerce/customers`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('userName', response.data.customer.firstName);
      new Modal(modalProps.modalSuccess);
      console.log('Зарегистрировали пользователя');

      const payload2 = {
        email: payload.email,
        password: payload.password,
      };

      await this.obtainTokens(payload2);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'There is already an existing customer with the provided email.') {
          new Modal(modalProps.modalEmail);
        }
      }
    }
  }

  async login(payload: ICustomerLogin) {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(`${this.API_URL}/${this.project_key}/login`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: 'keep-alive',
        },
      });

      await this.obtainTokens(payload);
      localStorage.setItem('userName', response.data.customer.firstName);
      location.href = '/';
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Account with the given credentials not found.') {
          new Modal(modalProps.modalCredentialsNotFound);
        }
      }
    }
  }

  async isRefreshTokenExist() {
    if (localStorage.getItem('refreshToken')) {
      console.log('Рефреш токен есть');
      return;
    } else {
      console.log('Рефреш токена нет');
      this.getAccessToken();
      localStorage.removeItem('userName');
    }
  }

  /*createCustomer(payload: ICustomerRegistration) {
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
  }*/

  /*getAccessToken() {
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
  }*/

  /*login(payload: ICustomerLogin) {
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
      .catch(function (error) {
        if (error.response.data.message === 'Account with the given credentials not found.') {
          new Modal(modalProps.modalCredentialsNotFound);
        }
        console.log(error);
      });
  }*/

  /*obtainTokens(payload: ICustomerLogin) {
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
  }*/
}
const api = new Api();

export default api;
