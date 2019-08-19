//Call this to register our module to main application
var moduleTemplateName = "virtoCommerce.pageBuilderModule";

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        //$stateProvider
        //    .state('workspace.virtoCommerce.pageBuilderModule', {
        //        url: '/virtoCommerce.pageBuilderModule',
        //        templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
        //        controller: [
        //            '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
        //                var newBlade = {
        //                    id: 'blade1',
        //                    controller: 'VirtoCommerce.PageBuilderModule.blade1Controller',
        //                    template: 'Modules/$(VirtoCommerce.PageBuilderModule)/Scripts/blades/helloWorld_blade1.tpl.html',
        //                    isClosingDisabled: true
        //                };
        //                bladeNavigationService.showBlade(newBlade);
        //            }
        //        ]
        //    });
    }
])
    .run(['$rootScope', 'platformWebApp.bladeNavigationService', 'platformWebApp.mainMenuService', 'platformWebApp.toolbarService', 'platformWebApp.widgetService', '$state',
        function ($rootScope, bladeNavigationService, mainMenuService, toolbarService, widgetService, $state) {
        var addNewPageCommand = {
            name: 'platform.commands.add',
            icon: 'fa fa-plus',
            executeMethod: function (blade) {
                var newBlade = {
                    id: 'listItemChild',
                    contentType: blade.contentType,
                    storeId: blade.storeId,
                    storeUrl: blade.storeUrl,
                    languages: blade.languages,
                    currentEntity: blade.currentEntity,
                    folderUrl: blade.currentEntity.url,
                    title: 'pageBuilder.blades.add-page.title',
                    subtitle: 'pageBuilder.blades.add-page.subtitle',
                    controller: 'virtoCommerce.pageBuilderModule.pageAddController',
                    template: 'Modules/$(VirtoCommerce.PageBuilderModule)/Scripts/blades/pages/page-add.tpl.html'
                };
                bladeNavigationService.showBlade(newBlade, blade);
            },
            canExecuteMethod: function (blade) {
                return true;
            },
            permission: 'content:create'
        };

        toolbarService.register(addNewPageCommand, 'virtoCommerce.contentModule.pagesListController');
    }
]);
