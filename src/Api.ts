import axios, { AxiosError } from 'axios';
import { ICustomerRegistration, ICustomerLogin } from './interfaces/interfaces';
import Modal from './components/modal/Modal';
import { modalProps } from './data/data';
import userState from './states/UserState';
import Loading from './components/Loading/Loading';

import router from '.';
import header from './components/Header/Header';
import { ProductsForPage } from './data/constants';
import { FilterEndpoints } from './data/productsEndpoints';

class Api {
  async getAccessToken() {
    try {
      const response = await axios.post(
        `${process.env.AUTH_URL}/oauth/token?grant_type=client_credentials`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      );
      userState.setAccessToken(response.data.access_token);
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
        `${process.env.AUTH_URL}/oauth/${process.env.PROJECT_KEY}/customers/token?grant_type=password&username=${payload.email}&password=${payload.password}`,
        {},
        {
          headers: {
            Authorization: 'Basic MnB2RWxuSk9OVzJfbWQyM0hrekJiNnYtOkhUTW9Vc1g2LTg3RmhnZ0ViMTFoRDE1bVdjYnZzWUNl',
          },
        },
      );
      userState.setRefreshToken(response.data.refresh_token);
      userState.setAccessToken(response.data.access_token);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  }

  async createCustomer(payload: ICustomerRegistration) {
    const loading = new Loading();
    try {
      const token = userState.getAccessToken();
      const response = await axios.post(`${process.env.API_URL}/rs-ecommerce/customers`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userState.setUserName(response.data.customer.firstName);
      loading.remove();
      new Modal(modalProps.modalSuccess);

      const payloadForLogin = {
        email: payload.email,
        password: payload.password,
      };

      await this.obtainTokens(payloadForLogin);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'There is already an existing customer with the provided email.') {
          loading.remove();
          new Modal(modalProps.modalEmail);
        }
      }
    }
  }

  async login(payload: ICustomerLogin) {
    const loading = new Loading();
    try {
      const token = userState.getAccessToken();
      const response = await axios.post(`${process.env.API_URL}/${process.env.PROJECT_KEY}/login`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await this.obtainTokens(payload);
      userState.setUserName(response.data.customer.firstName);
      loading.remove();
      header.renderNav();
      router.navigateTo('/');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Account with the given credentials not found.') {
          loading.remove();
          new Modal(modalProps.modalCredentialsNotFound);
        }
      }
    }
  }

  async isRefreshTokenExist() {
    if (userState.getRefreshToken()) {
      return;
    } else {
      this.getAccessToken();
      userState.removeUserName();
    }
  }

  async queryProducts() {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(`${process.env.API_URL}/${process.env.PROJECT_KEY}/products?limit=100`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      result = response.data.results;
    } catch (error) {
      console.error(error);
      result = error;
      console.log(error);
    }
    return result;
  }

  async getProductsForPage(page = 1) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        // `${process.env.API_URL}/${process.env.PROJECT_KEY}/products?limit=${ProductsForPage}&offset=${(page - 1) * ProductsForPage}&${ProductsEndpoints.marvel}`,
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/products?limit=${ProductsForPage}&offset=${(page - 1) * ProductsForPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
      console.log(error);
    }
    return result;
  }

  async filterProducts(page: number, filter: FilterEndpoints) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        // `${process.env.API_URL}/${process.env.PROJECT_KEY}/products?limit=${ProductsForPage}&offset=${(page - 1) * ProductsForPage}&${ProductsEndpoints.marvel}`,
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/product-projections/search?filter=${filter}&limit=${ProductsForPage}&offset=${(page - 1) * ProductsForPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
      console.log(error);
    }
    return result;
  }

  async getAllCategories() {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(`${process.env.API_URL}/${process.env.PROJECT_KEY}/categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      result = response.data.results;
      console.log(result);
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async getCategory(id: string) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(`${process.env.API_URL}/${process.env.PROJECT_KEY}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      result = response.data.name['en-US' as keyof typeof response.data.name];
      console.log(result);
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }
}
const api = new Api();

export default api;

//?where=%28key%3D%22ackbar%22%29

//filter
//{{host}}/{{project-key}}/product-projections/search?filter=productType.id:"8ec0960c-cbfe-412a-bf93-4675105932d7"
