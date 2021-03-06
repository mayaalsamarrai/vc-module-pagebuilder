var moduleTemplateName = "virtoCommerce.pageBuilderModule";

angular.module(moduleTemplateName)
    .controller('virtoCommerce.pageBuilderModule.pageAddController', ['$rootScope', '$scope', 'platformWebApp.bladeNavigationService', function ($rootScope, $scope, bladeNavigationService) {
        $scope.addDesignPage = function () {
            var newBlade = {
                id: 'designPage',
                contentType: $scope.blade.contentType,
                storeId: $scope.blade.parentBlade.storeId,
                storeUrl: $scope.blade.storeUrl,
                folderUrl: $scope.blade.currentEntity.url,
                currentEntity: {},
                isNew: true,
                title: 'pageBuilder.blades.edit-page.title-new',
                subtitle: 'pageBuilder.blades.edit-page.subtitle-new',
                controller: 'virtoCommerce.pageBuilderModule.editPageController',
                template: 'Modules/$(VirtoCommerce.PageBuilderModule)/Scripts/blades/pages/edit-page.tpl.html'
            };

            bladeNavigationService.showBlade(newBlade, $scope.blade.parentBlade);
        };

        $scope.addHtmlPage = function () {
            var newBlade = {
                id: 'pageDetail',
                contentType: $scope.blade.contentType,
                storeId: $scope.blade.storeId,
                storeUrl: $scope.blade.storeUrl,
                languages: $scope.blade.languages,
                folderUrl: $scope.blade.currentEntity.url,
                currentEntity: {},
                isNew: true,
                title: null,
                controller: 'virtoCommerce.contentModule.pageDetailController',
                template: 'Modules/$(VirtoCommerce.Content)/Scripts/blades/pages/page-detail.tpl.html'
                //id: 'pageDetail',
                //contentType: $scope.blade.parentBlade.contentType,
                //storeId: $scope.blade.parentBlade.storeId,
                //storeUrl: $scope.blade.parentBlade.storeUrl,
                //languages: $scope.blade.parentBlade.languages,
                //folderUrl: $scope.blade.parentBlade.currentEntity.url,
                //currentEntity: {},
                //isNew: true,
                //title: 'pageBuilder.blades.edit-page.title-new',
                //subtitle: 'pageBuilder.blades.edit-page.subtitle-new',
                //controller: 'virtoCommerce.contentModule.pageDetailController',
                //template: 'Modules/$(VirtoCommerce.Content)/Scripts/blades/pages/page-detail.tpl.html'
            };

            if (isBlogs()) {
                angular.extend(newBlade, {
                    title: 'pageBuilder.blades.edit-page.title-new-post',
                    subtitle: 'pageBuilder.blades.edit-page.subtitle-new-post'
                });
            };

            bladeNavigationService.showBlade(newBlade, $scope.blade.parentBlade);
        };

        function isBlogs() {
            return $scope.blade.parentBlade.contentType === 'blogs';
        }

        $scope.blade.isLoading = false;
    }]);
