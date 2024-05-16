import axios from 'axios';
import { ICustomerRegistration } from './interfaces/interfaces';
import Modal from './components/modal/Modal';
import { modalProps } from './data/data';

class Api {
  private project_key = 'rs-ecommerce';
  private client_id = '2pvElnJONW2_md23HkzBb6v-';
  private secret = 'HTMoUsX6-87FhggEb11hD15mWcbvsYCe';
  private API_URL = 'https://api.australia-southeast1.gcp.commercetools.com';
  private Auth_URL = 'https://auth.australia-southeast1.gcp.commercetools.com';
  private accessToken = '';

  createCustomer(body: ICustomerRegistration) {
    axios
      .post(`${this.API_URL}/rs-ecommerce/customers`, body, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then(function (response) {
        new Modal(modalProps.modalSuccess);
        console.log(response);
        localStorage.setItem('userName', response.data.customer.firstName);
      })
      .catch(function (error) {
        if (error.response.data.message === 'There is already an existing customer with the provided email.') {
          new Modal(modalProps.modalEmail);
        }
      });
  }

  obtainAccessToken() {
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
        console.log(response);
        this.accessToken = response.data.access_token;
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  }

  obtainRefreshToken() {
    axios
      .post(
        `${this.Auth_URL}/oauth/${this.project_key}/customers/token`,

        {},
        {
          headers: {
            Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  }
}

const api = new Api();

export default api;
