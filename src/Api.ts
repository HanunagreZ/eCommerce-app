import axios, { AxiosError } from 'axios';
import { ICustomerRegistration, ICustomerLogin, IPersonalData, IAddress } from './interfaces/interfaces';
import Modal from './components/Modal/Modal';
import { modalProps } from './data/data';
import userState from './states/UserState';
import Loading from './components/Loading/Loading';
import personal from './Pages/Profile/Personal/Personal';

import router from '.';
import header from './components/Header/Header';
import { ProductsForPage } from './data/constants';
import basket from './components/Header/Basket/Basket';

class Api {
  async getAccessToken() {
    let result;
    try {
      const response = await axios.post(
        `${process.env.AUTH_URL}/oauth/${process.env.PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
        {},
        {
          headers: {
            Authorization: 'Basic V05TYU9QOUtJVlhhenVyNEFzRnhfeHdvOm1nSk1idTc2QXFSb05KZUE5MGVxQWo4ZHMzQlVKSWN4',
          },
        },
      );
      result = response.data.access_token; //anonimous_access_token
      userState.setAccessToken(response.data.access_token);
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async obtainTokens(payload: ICustomerLogin) {
    try {
      const response = await axios.post(
        `${process.env.AUTH_URL}/oauth/${process.env.PROJECT_KEY}/customers/token?grant_type=password&username=${payload.email}&password=${payload.password}`,
        {},
        {
          headers: {
            Authorization: 'Basic V05TYU9QOUtJVlhhenVyNEFzRnhfeHdvOm1nSk1idTc2QXFSb05KZUE5MGVxQWo4ZHMzQlVKSWN4',
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
      userState.setUserId(response.data.customer.id);
      userState.setUserVersion(response.data.customer.version);
      personal.updateContent();

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
      userState.setUserId(response.data.customer.id);
      userState.setUserVersion(response.data.customer.version);
      personal.updateContent();
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

  async hiddenLogin(payload: ICustomerLogin) {
    try {
      const token = userState.getAccessToken();
      const response = await axios.post(`${process.env.API_URL}/${process.env.PROJECT_KEY}/login`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await this.obtainTokens(payload);

      userState.setUserName(response.data.customer.firstName);
      userState.setUserId(response.data.customer.id);
      userState.setUserVersion(response.data.customer.version);
      personal.updateContent();
    } catch (error) {
      console.error(error);
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

  async getSelectedProducts(page: number, filter: string, sorting: string) {
    await this.getAccessToken();
    await this.isRefreshTokenExist();
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/product-projections/search?${filter}&${sorting}&limit=${ProductsForPage}&offset=${(page - 1) * ProductsForPage}&expand=categories[*].ancestors[*]`,
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
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async getExtendedProducts() {
    await this.getAccessToken();
    await this.isRefreshTokenExist();
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/product-projections?limit=200&expand=categories[*].ancestors[*]`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      result = response.data.results;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async getCustomerById(id: string) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(`${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      result = response;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async changeCustomerPersonalData(data: IPersonalData) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'setFirstName',
              firstName: data.firstName,
            },
            {
              action: 'setLastName',
              lastName: data.lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: data.dateOfBirth,
            },
            {
              action: 'changeEmail',
              email: data.email,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);
      userState.setUserName(response.data.firstName);
      new Modal(modalProps.modalSuccessUpdate);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'There is already an existing customer with the provided email.') {
          new Modal(modalProps.modalUserChangeEmail);
        }
      }
    }
  }

  async changeCustomerPassword(data: string[]) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/password`,
        {
          id: userState.getUserId(),
          version: userState.getUserVersion(),
          currentPassword: data[0],
          newPassword: data[1],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);

      const payload = {
        email: response.data.email,
        password: data[1],
      };

      await this.getAccessToken();
      await this.hiddenLogin(payload);

      new Modal(modalProps.modalUserChangePasswordSuccess);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'The given current password does not match.') {
          new Modal(modalProps.modalUserWrongCurrentPassword);
        }
      }
    }
  }

  async addNewCustomerAddress(data: IAddress) {
    let newAddressId;

    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'addAddress',
              address: {
                title: '',
                salutation: '',
                firstName: '',
                lastName: '',
                streetName: data.streetName,
                streetNumber: '',
                additionalStreetInfo: '',
                postalCode: data.postalCode,
                city: data.city,
                region: '',
                state: '',
                country: data.country,
                company: '',
                department: '',
                building: '',
                apartment: '',
                pOBox: '',
                phone: '',
                mobile: '',
                email: '',
                fax: '',
                additionalAddressInfo: '',
                externalId: 'none',
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      newAddressId = response.data.addresses[response.data.addresses.length - 1].id;

      userState.setUserVersion(response.data.version);
      new Modal(modalProps.modalSuccessNewAddress);
    } catch (error) {
      console.error(error);
    }

    return newAddressId;
  }

  async changeCustomerAddress(data: IAddress, id: string) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'changeAddress',
              addressId: id,
              address: {
                title: '',
                salutation: '',
                firstName: '',
                lastName: '',
                streetName: data.streetName,
                streetNumber: '',
                additionalStreetInfo: '',
                postalCode: data.postalCode,
                city: data.city,
                region: '',
                state: '',
                country: data.country,
                company: '',
                department: '',
                building: '',
                apartment: '',
                pOBox: '',
                phone: '',
                mobile: '',
                email: '',
                fax: '',
                additionalAddressInfo: '',
                externalId: 'none',
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);
      new Modal(modalProps.modalSuccessUpdate);
    } catch (error) {
      console.error(error);
    }
  }

  async removeAddressById(id: string) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'removeAddress',
              addressId: id,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);
      new Modal(modalProps.modalSuccessDelete);
    } catch (error) {
      console.error(error);
    }
  }

  async setDefaultBillingAddress(id: string) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'setDefaultBillingAddress',
              addressId: id,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);
    } catch (error) {
      console.error(error);
    }
  }

  async setDefaultShippingAddress(id: string) {
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/customers/${userState.getUserId()}`,
        {
          version: userState.getUserVersion(),
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId: id,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      userState.setUserVersion(response.data.version);
    } catch (error) {
      console.error(error);
    }
  }

  async getProductByKey(key: string) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/products/key=${key}?expand=masterData.current.categories[*].obj&expand=masterData.current.masterVariant.prices[*].discountedPrice`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      result = response.data.masterData.current;
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
    return result;
  }
  async getProductDiscountByKey(key: string) {
    let result;
    try {
      const accessToken = userState.getAccessToken();
      const response = await axios.get(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/{projectKey}/product-discounts/key=${key}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      result = response.data.masterData;
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  //===== методы для корзины =====

  async createCart() {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts`,
        {
          currency: 'USD',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async getCartByID(id: string) {
    let result;

    const token = userState.getAccessToken();

    try {
      const response = await axios.get(`${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async addLineItem(cartId: string, cartVersion: number, productSku: string, quantity = 1) {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: 'addLineItem',
              sku: productSku,
              quantity: quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      basket.reRenderCount(response.data.totalLineItemQuantity);
      if (userState.getAnonymousCartId()) {
        userState.setAnonymousCartVersion(response.data.version);
      } else {
        userState.setCustomerCartVersion(response.data.version);
      }
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async removeLineItem(cartId: string, cartVersion: number, lineItemId: string, quantity = 1) {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItemId,
              quantity: quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      basket.reRenderCount(response.data.totalLineItemQuantity);
      if (userState.getAnonymousCartId()) {
        userState.setAnonymousCartVersion(response.data.version);
      } else {
        userState.setCustomerCartVersion(response.data.version);
      }
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async changeLineItemQuantity(cartId: string, cartVersion: number, lineItemId: string, quantity: number) {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItemId,
              quantity: quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      basket.reRenderCount(response.data.totalLineItemQuantity);
      if (userState.getAnonymousCartId()) {
        userState.setAnonymousCartVersion(response.data.version);
      } else {
        userState.setCustomerCartVersion(response.data.version);
      }
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async addDiscountCode(cartId: string, cartVersion: number, discountCode: string) {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: 'addDiscountCode',
              code: discountCode,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (userState.getAnonymousCartId()) {
        userState.setAnonymousCartVersion(response.data.version);
      } else {
        userState.setCustomerCartVersion(response.data.version);
      }
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async setCustomerIdForCart(cartId: string, version: number, customerId: string) {
    let result;
    const token = userState.getAccessToken();

    try {
      const response = await axios.post(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/${cartId}`,
        {
          version: version,
          actions: [
            {
              action: 'setCustomerId',
              customerId: customerId,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      userState.setCustomerCartVersion(response.data.version);
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }

  async getCartByCustomerId() {
    let result;
    const token = userState.getAccessToken();
    const customerId = userState.getUserId();
    try {
      const response = await axios.get(
        `${process.env.API_URL}/${process.env.PROJECT_KEY}/carts/customer-id=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      result = response.data;
    } catch (error) {
      console.error(error);
      result = error;
    }
    return result;
  }
}

const api = new Api();

export default api;
