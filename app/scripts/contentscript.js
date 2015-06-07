'use strict';

window.addEventListener("load", function() {
  var app = angular.module('MoleEditor', []);
  var html = document.querySelector('html');
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  var jsRepoPjaxContainer = document.getElementById('js-repo-pjax-container');
    jsRepoPjaxContainer.setAttribute('ng-controller', 'MainController');
  app.controller('MainController', function ($scope) {

      $scope.goInteractive = function() {
          $scope.moles = JSON.parse(document.getElementById('blob_contents').value);
          $scope.$watch('moles', function(newValue, oldValue) {
              if (angular.toJson(oldValue) !== angular.toJson(newValue)) {
                  document.querySelector('.js-blob-submit').removeAttribute("disabled");
                  document.getElementById('blob_contents').value = angular.toJson($scope.moles, true);
              }
          }, true);
          $scope.interactive = true;
      };
  });

    document.querySelector('.js-code-editor').setAttribute("ng-hide", "interactive");

    var myDirective = document.createElement('div');
    myDirective.setAttribute('my-directive', '');
    var breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.appendChild(myDirective);

    console.log("directive added");

    app.directive('myDirective', [ '$sce', function($sce) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('templates/molePanel.html'))
    };
  }]);

  angular.bootstrap(html, ['MoleEditor'], []);
});
