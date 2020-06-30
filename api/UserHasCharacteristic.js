// Checked / Not Tested

import { Api } from './api';

class UserHasCharacteristic {
  constructor({a_user_id, a_char_id}) {
    this.a_user_id = a_user_id;
    this.a_char_id = a_char_id;
  }
}

class UserHasCharacteristicApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se vinculó la carac. con el user especificado
      EJEMPLO:
      {
        "message": "Successfully added user has charactersitic",
        "result": [
          {
            "a_user_id": 1,
            "a_char_id": 2
          }
        ]
      }

    409 - La carac. ya existe en el user
      EJEMPLO:
      {
        "message": "Conflict with userHasCharacteristic",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_user_id": 1,
                "a_char_id": 2
              }
            ]
          }
        ]
      }
  */
  static addCharacteristicToUser(userId, charId) {
    return Api.post(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic/${charId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se devinculó la carac. con el user especificado
      EJEMPLO:
      {
        "message": "Successfully deleted user has charactersitic",
        "result": 1
      }

    404 - La carac. no existe en el user
  */
  static removeCharacteristicFromUser(userId, charId) {
    return Api.delete(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic/${charId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Carac. del user especificado
      EJEMPLO:
      {
        "message": "Successfully fetched characteristics by user id 2",
        "result": [
          {
            "a_char_id": 1,
            "a_char_name": "vegano"
          },
          {
            "a_char_id": 4,
            "a_char_name": "diabetico"
          }
        ]
      }
  */
  static getCharactersticsByUser(userId) {
    return Api.get(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Users con la carac. especificada
      EJEMPLO:
      {
        "message": "Successfully fetched user by characteristics id 1",
        "result": [
          {
            "a_user_id": 2,
            "a_name": "user2",
            "a_gender": null,
            "a_birthdate": null,
            "a_email": "user2@email.com",
            "a_created_at": "2020-06-30T18:30:32.338Z",
            "a_image_url": (url)
          }
        ]
      }
  */
  static getUsersByCharacteristic(charId) {
    return Api.get(`${UserHasCharacteristicApi.url}/characteristic/${charId}/user`);
  }
}

export { UserHasCharacteristic, UserHasCharacteristicApi };