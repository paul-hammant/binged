'use strict';

window.addEventListener("load", function() {
  var app = angular.module('Binged', []);
    console.log("heloo");
  var html = document.querySelector('html');
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  var jsRepoPjaxContainer = document.getElementById('js-repo-pjax-container');
    jsRepoPjaxContainer.setAttribute('ng-controller', 'MainController');
  app.controller('MainController', function ($scope) {});

    console.log("jsRepoPjaxContainer done");


    var blobContents = document.getElementById('blob_contents');
    blobContents.setAttribute('ng-model', 'moles');

    console.log("moles done");

    var myDirective = document.createElement('div');
  myDirective.setAttribute('my-directive', '');
  document.querySelector('.file-commit-form').appendChild(myDirective);

    console.log("appended");

    app.directive('myDirective', [ '$sce', function($sce) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('templates/molePanel.html'))
    };
  }]);

  angular.bootstrap(html, ['Binged'], []);
});
