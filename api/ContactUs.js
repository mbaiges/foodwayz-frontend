// Checked / Not Tested

import { Api } from './api';

class ContactUsApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/contact_us`;
  }

  static customEmail({reason, body}) {
    return Api.post(`${ContactUsApi.url}/contact_us`, {reason, body});
  }

  static typeRequest(a_type_name) {
    return Api.post(`${ContactUsApi.url}/contact_us/type_request`, {a_type_name});
  }
  
  static ingredientRequest(a_ingr_name) {
    return Api.post(`${ContactUsApi.url}/contact_us/ingredient_request`, {a_ingr_name});
  }

  static characteristicRequest(a_char_name) {
    return Api.post(`${ContactUsApi.url}/contact_us/characteristic_request`, {a_char_name});
  }
  
}

export { ContactUsApi };