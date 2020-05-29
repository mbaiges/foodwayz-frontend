/*
import { RoomApi, Room } from './room.js';

var currentRoom;
var createButton, updateButton, deleteButton, getButton, getAllButton, abortButton;
var resultTextArea;
var abortController;

function toggleButtons(disabled) {
  createButton.disabled = disabled;
  updateButton.disabled = !disabled;
  deleteButton.disabled = !disabled;
  getButton.disabled = !disabled;
}

function showResult(result) {
  resultTextArea.innerHTML = JSON.stringify(result, null, 2)
}

function showError(error) {
  resultTextArea.innerHTML = `Request failed: ${error.description} [Code: ${error.code}]`;
}

window.addEventListener('load', () => {
  createButton = document.querySelector('#create');
  updateButton = document.querySelector('#update');
  deleteButton = document.querySelector('#delete');
  getButton = document.querySelector('#get');
  getAllButton = document.querySelector('#getAll');
  abortButton = document.querySelector('#abort');
  resultTextArea = document.querySelector('#result');

  createButton.addEventListener('click', () => {
    var index = Math.floor(Math.random() * (999 - 1) + 1)
    currentRoom = new Room(null, `kitchen ${index}`, { 'size': '9m2' });

    RoomApi.add(currentRoom)
      .then(data => {
        currentRoom.id = data.result.id;
        showResult(data);
        toggleButtons(true);
      })
      .catch(error => {
        showError(error);
      });
  }, false);

  updateButton.addEventListener('click', () => {
    currentRoom.meta = { 'size': '6m2' };

    RoomApi.modify(currentRoom)
      .then(data => {
        showResult(data);
      })
      .catch(error => {
        showError(error);
      });
  }, false);

  deleteButton.addEventListener('click', () => {
    RoomApi.delete(currentRoom.id)
      .then(data => {
        showResult(data);
        toggleButtons(false);
      })
      .catch(error => {
        showError(error);
      });
  }, false);

  getButton.addEventListener('click', async () => {
    abortButton.disabled = false;
    abortController = new AbortController();

    try {
      let result = await RoomApi.get(currentRoom.id);
      abortButton.disabled = true;
      showResult(result);
    } catch(error) {
      abortButton.disabled = true;
      showError(error);
    }
  }, false);

  getAllButton.addEventListener('click', async () => {
    abortButton.disabled = false;
    abortController = new AbortController();

    try {
      let result = await RoomApi.getAll(abortController);
      abortButton.disabled = true;
      showResult(result);
    } catch(error) {
      abortButton.disabled = true;
      showError(error);
    }
  }, false);

  abortButton.addEventListener('click', () => {
    if (abortController)
      abortController.abort();
  }, false);

  toggleButtons(false);
}, false);
*/