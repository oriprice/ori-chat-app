'use strict';
const angular = require('angular');

export function messengerService() {
  let messages = [];
  return {
    messageToElement(element, message) {
      element.postMessage(JSON.stringify(message), '*');
    },
    messages
  };
}

export default angular.module('placerApp.messengerService', [])
  .service('messengerService', messengerService)
  .name;
