'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';


import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import chatIframe from './chatIframe/chatIframe.component';
import messenger from '../directives/messenger/messenger.directive';
import messengerService from '../services/messenger/messenger.service';
import constants from './app.constants';

import './app.less';

angular.module('placerApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
  main, constants, chatIframe, messenger, messengerService
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['placerApp'], {
      strictDi: true
    });
  });
