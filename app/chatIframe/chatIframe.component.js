'use strict';
const angular = require('angular');

export class chatIframeComponent {
  static $inject = ['$element'];

  constructor($element) {
    this.$element = $element;
  }

  $postLink() {
    this.$element.children().on('load', (function(element, chatname) {
      return () => {
        element.children().contents()
          .find('form')
          .attr('id', chatname);
      };
    }(this.$element, this.chatname)));
  }
}

export default angular.module('placerApp.chatIframe', [])
  .component('chatIframe', {
    template: require('./chatIframe.html'),
    bindings: { chatname: '@' },
    controller: chatIframeComponent
  })
  .name;
