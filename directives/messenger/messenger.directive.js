'use strict';
import moment from 'moment';
const angular = require('angular');

export default angular.module('placerApp.messenger', [])
  .directive('messenger', ['messengerService', '$window', function(messengerService, $window) {
    return {
      restrict: 'A',
      link(scope, element) {
        element.on('load', function() {
          element.contents().find('form')
            .on('submit', event => {
              event.preventDefault();
              let messageData = {};
              messageData.chatId = angular.element(event.target).attr('id');
              messageData.timeStamp = moment().format('LTS');
              let formData = new FormData(event.target);
              event.target.reset();
              for(let pair of formData.entries()) {
                messageData[pair[0]] = pair[1];
              }
              messengerService.messageToElement($window.parent, messageData);
            });

          element[0].contentWindow.addEventListener('message', event => {
            let messageData = JSON.parse(event.data);
            let chatBoxElement = angular.element(element.contents()[0].querySelector('#chatbox'));
            let htmlString = chatBoxElement.html() + (element[0].id !== messageData.chatId
              ? `<li style="width: 96%;margin-left: -40px;">
                        <div class="msj-rta macro">
                            <div class="text text-r">
                                <p>${messageData.chatId}</p>
                                ${messageData.message}
                                <p><small>${messageData.timeStamp}</small></p>
                            </div>
                        <div class="avatar"><img class="img-circle" style="width:100%;" 
                        src="https://randomuser.me/api/portraits/med/men/${messageData.chatId.replace('iframe', '')}.jpg" /></div>
                        </li>`
              : `<li style="width:100%;">
                        <div class="msj macro">
                        <div class="avatar"><img class="img-circle" style="width:100%;" 
                        src="https://randomuser.me/api/portraits/med/men/${messageData.chatId.replace('iframe', '')}.jpg" /></div>
                            <div class="text text-r">
                                <p>${messageData.chatId}</p>
                                ${messageData.message}
                                <p><small>${messageData.timeStamp}</small></p>
                            </div>
                                                       
                  </li>`);
            chatBoxElement.html(htmlString);
            chatBoxElement.children()[chatBoxElement.children().length - 1].scrollIntoView();
          }, false);
        });
      }
    };
  }])
  .name;
