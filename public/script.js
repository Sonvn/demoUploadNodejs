/**
 * Created by Son on 6/30/2015.
 */
"use strict";

angular.module('demoUpload', ['ngFileUpload'])
    .controller('demoUpload.ctrl', function ($scope, $http) {

        $scope.upload = function () {

        }
    })
    .directive('fileInput', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function ($scope, elem, attr) {
                elem.bind('change', function () {
                    $parse(attr.fileInput).assign($scope, elem[0].files);
                    $scope.$apply();
                    //console.log(attr.fileInput);
                    //console.log(elem[0].files);
                });
            }
        };
    }]);