import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import _ from 'lodash';

export class MainController {
  static $inject = ['$element', '$window', 'messengerService'];

  constructor($element, $window, messengerService) {
    this.index = 0;
    this.$element = $element;
    this.$window = $window;
    this.messengerService = messengerService;
    this.chatNames = [];
    this.onClick = (function(index, chatNames) {
      return () => {
        chatNames.push(`iframe${index}`);
        index++;
      };
    }(this.index, this.chatNames));
  }

  parseJson(str) {
    let result = false;
    try {
      result = JSON.parse(str);
    } catch(e) {
    }
    return result;
  }

  $postLink() {
    //get message from one iframe and send it back to the rest (after "persisting" message in local service)
    this.$window.addEventListener('message', (function(element, messengerService, parseJson) {
      return event => {
        let messageData = event && parseJson(event.data);
        if(messageData.message === undefined) {
          return;
        }
        messengerService.messages.push(messageData);
        let iframes = element.find('chat-iframe');
        _.forEach(iframes, iframe => {
          let contentWindow = angular.element(iframe).find('iframe')[0].contentWindow;
          messengerService.messageToElement(contentWindow, messageData);
        });
      };
    }(this.$element, this.messengerService, this.parseJson)), false);
  }
}

export default angular.module('placerApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
