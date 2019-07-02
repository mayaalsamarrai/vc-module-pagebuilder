//Call this to register our module to main application
var moduleTemplateName = "VirtoCommerce.PageBuilderModule";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('workspace.VirtoCommerce.PageBuilderModule', {
                url: '/VirtoCommerce.PageBuilderModule',
                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                controller: [
                    '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                        var newBlade = {
                            id: 'blade1',
                            controller: 'VirtoCommerce.PageBuilderModule.blade1Controller',
                            template: 'Modules/$(VirtoCommerce.PageBuilderModule)/Scripts/blades/helloWorld_blade1.tpl.html',
                            isClosingDisabled: true
                        };
                        bladeNavigationService.showBlade(newBlade);
                    }
                ]
            });
    }
])
.run(['$rootScope', 'platformWebApp.mainMenuService', 'platformWebApp.toolbarService', 'platformWebApp.widgetService', '$state',
    function ($rootScope, mainMenuService, toolbarService, widgetService, $state) {
        var addNewPageCommand = {
            name: 'platform.commands.add',
            icon: 'fa fa-plus',
            executeMethod: function (blade) {
                var newBlade = {
                    id: 'listItemChild',
                    title: 'content.blades.add-page.title',
                    subtitle: 'content.blades.add-page.subtitle',
                    controller: 'virtoCommerce.contentModule.pagesListController',
                    template: 'Modules/$(VirtoCommerce.Content)/Scripts/blades/pages/page-add.tpl.html'
                };
                console.log('hello!!!');
                //bladeNavigationService.showBlade(newBlade, blade);
            },
            canExecuteMethod: function (blade) {
                return true;
            },
            permission: 'content:create'
        };

        toolbarService.register(addNewPageCommand, 'virtoCommerce.contentModule.contentMainController');
    }
]);
