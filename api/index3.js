import Model from './models';

export default class Api {
  constructor() {}

  static get baseUrl() {
    return `http:192.168.1.13:3002`;
  }

  static get timeout() {
    return 60 * 1000;
  }

  static fetch(url, init) {
    return new Promise((resolve, reject) => {
      let controller = new AbortController();
      let signal = controller.signal;

      setTimeout(() => controller.abort(), Api.timeout);

      init.signal = signal

      fetch(url, init)
      .then(response => {
        if (!response.ok)
          reject(new Error(response.statusText));

        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static get(url) {
    return Api.fetch(url, {})
  }

  static post(url, data) {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    if (data.token){
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${data.token}`
      }
    }
    return Api.fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
  }

  static put(url, data) {
    return Api.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });
  }

  static delete(url) {
    return Api.fetch(url, {
      method: 'DELETE',
    });
  }

  static model = Model;

  // -------------------------------------AUTH------------------------------------------

  static auth = class {
    static get registerUrl() {
      return `${Api.baseUrl}/register`;
    }

    static get loginUrl() {
      return `${Api.baseUrl}/login`;
    }

    static register(data) {
      return noAuthPost(Api.auth.registerUrl, data);
    }

    static login(obj) {
      return noAuthPost(Api.auth.loginUrl, data);
    }

    static noAuthPost(url, data) {
      let headers = {
        'Content-Type': 'application/json; charset=utf-8'
      }
      return Api.fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
    }

  }

  // ------------------------------------MODELS-----------------------------------------

  //-------------------GENERIC------------------------
  static Generic = class {
    constructor() {}

    static get url() {
      return `${Api.baseUrl}/food`;
    }

    static add(obj) {
    return Api.post(Api.generic.url, obj);
    }

    static modify(obj) {
      return Api.put(`${Api.generic.url}/${generic.id}`, obj);
    }

    static delete(id) {
      return Api.delete(`${Api.generic.url}/${id}`);
    }

    static get(id) {
      return Api.get(`${Api.generic.url}/${id}`);
    }

    static getAll() {
      return Api.get(Api.generic.url);
    }
  }
  //--------------------------------------------------

  //--------------------FOOD--------------------------
  static Food = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/food`;
      }
  }
  //--------------------------------------------------


  //--------------------TYPE--------------------------
  static Type = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/type`;
      }
    }
  //--------------------------------------------------


  //--------------------REST--------------------------
  static Restaurant = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/restaurant`;
      }
    }
  //--------------------------------------------------


  //------------------RESTCHAIN-----------------------
  static RestaurantChain = class extends Api.Generic{
      constructor() {
        super();
      }
  
      static get url() {
        return `${Api.baseUrl}/restChain`;
      }
    }
  //--------------------------------------------------


  //--------------------USER--------------------------
  static User = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/user`;
      }
    }
  //--------------------------------------------------


  //-------------------REVIEW-------------------------
  static Review = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/review`;
      }
    }
  //--------------------------------------------------


  //--------------------OWNER-------------------------
  static Owner = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/owner`;
      }
    }
  //--------------------------------------------------


  //--------------------OWNS--------------------------
  static Owns = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/owns`;
      }
    }
  //--------------------------------------------------


  //--------------------CHAR--------------------------
  static Characteristic = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/characteristic`;
      }
    }
  //--------------------------------------------------


  //-------------------USRCHAR------------------------
  static UserCharacteristic = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/userCharacteristic`;
      }
    }
  //--------------------------------------------------


  //-------------------FOODCHAR-----------------------
  static FoodCharacteristic = class extends Api.generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/foodCharacteristic`;
      }
    }
  //--------------------------------------------------


  //------------------INGREDIENT----------------------
  static Ingredient = class extends Api.Generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/ingredient`;
      }
    }
  //--------------------------------------------------


  //-------------------FOODING------------------------
  static FoodIngredient = class extends Api.generic{
      constructor() {
        super();
      }

      static get url() {
        return `${Api.baseUrl}/foodIngredient`;
      }
    }
  //--------------------------------------------------
}