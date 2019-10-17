angular.module('virtoCommerce.pageBuilderModule')
.factory('virtoCommerce.pageBuilderModuleApi', ['$resource', function ($resource) {
    return $resource('api/virtoCommerce.pageBuilderModule');
}]);
