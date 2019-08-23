angular.module('virtoCommerce.pageBuilderModule')
    .controller('virtoCommerce.pageBuilderModule.editPageController', ['$rootScope', '$scope', 'platformWebApp.validators', 'virtoCommerce.contentModule.contentApi', 'platformWebApp.dynamicProperties.api', 'platformWebApp.bladeNavigationService', 'platformWebApp.dialogService', 'platformWebApp.dynamicProperties.dictionaryItemsApi', 'platformWebApp.settings',
        function ($rootScope, $scope, validators, contentApi, dynamicPropertiesApi, bladeNavigationService, dialogService, dictionaryItemsApi, settings) {
            var blade = $scope.blade;
            blade.updatePermission = 'content:update';
            blade.designerUrl = null;
            $scope.validators = validators;

            blade.initialize = function () {
                blade.designerUrl = window.location.origin +
                    (window.location.pahtname === '/' ? '' : window.location.pathname) +
                    '/Modules/VirtoCommerce.PageBuilderModule/Content/builder/';
                if (blade.isNew) {
                    blade.isLoading = false;
                    $scope.blade.currentEntity.blocks = [{ type: 'settings', title: '', permalink: '' }];
                    $scope.blade.currentEntity.settings = $scope.blade.currentEntity.blocks[0];
                    $scope.blade.currentEntity.content = JSON.stringify($scope.blade.currentEntity.blocks);
                } else {
                    contentApi.get({
                        contentType: blade.contentType,
                        storeId: blade.storeId,
                        relativeUrl: blade.currentEntity.relativeUrl
                    }, function (data) {
                        blade.isLoading = false;
                        blade.currentEntity.content = JSON.parse(data.data);

                        $scope.blade.currentEntity.blocks = blade.currentEntity.content;
                        $scope.blade.currentEntity.settings = $scope.blade.currentEntity.blocks[0];
                        $scope.blade.currentEntity.content = JSON.stringify($scope.blade.currentEntity.blocks);

                        blade.origEntity = angular.copy(blade.currentEntity);
                    }, function (error) {
                        bladeNavigationService.setError('Error ' + error.status, $scope.blade);
                        blade.isLoading = false;
                    });
                }
            };

            $scope.saveChanges = function () {
                var fileName = $scope.blade.currentEntity.name;
                if (!fileName.endsWith('.page')) {
                    fileName += '.page';
                }

                var originFileName = fileName;

                if (!blade.isNew) {
                    originFileName = blade.origEntity.name;
                    if (!originFileName.endsWith('.page')) {
                        originFileName += '.page';
                    }
                }

                $scope.blade.currentEntity.name = originFileName;
                $scope.blade.currentEntity.relativeUrl = ($scope.blade.parentBlade.currentEntity.relativeUrl || '') + '/' + originFileName;
                $scope.blade.currentEntity.content = JSON.stringify($scope.blade.currentEntity.blocks, null, 4);

                blade.isLoading = true;

                contentApi.saveMultipartContent({
                    contentType: blade.contentType,
                    storeId: blade.storeId,
                    folderUrl: blade.folderUrl || ''
                }, $scope.blade.currentEntity,
                    function () {
                        blade.isLoading = false;
                        blade.origEntity = angular.copy(blade.currentEntity);
                        if (blade.isNew) {
                            $scope.bladeClose();
                            $rootScope.$broadcast("cms-statistics-changed", blade.storeId);
                        }

                        blade.parentBlade.refresh();
                        if (blade.isNew) {
                            runDesigner();
                        }
                    }, function (error) { bladeNavigationService.setError('Error ' + error.status, blade); });
            };

            if (!blade.isNew) {
                blade.toolbarCommands = [
                    {
                        name: "platform.commands.save", icon: 'fa fa-save',
                        executeMethod: $scope.saveChanges,
                        canExecuteMethod: canSave,
                        permission: blade.updatePermission
                    },
                    {
                        name: "platform.commands.reset", icon: 'fa fa-undo',
                        executeMethod: function () {
                            angular.copy(blade.origEntity, blade.currentEntity);
                        },
                        canExecuteMethod: isDirty,
                        permission: blade.updatePermission
                    },
                    {
                        name: "content.commands.preview-page", icon: 'fa fa-eye',
                        executeMethod: function () {
                            if (blade.storeUrl) {
                                var path = generatePath();
                                window.open(blade.storeUrl + path, '_blank');
                            }
                            else {
                                var dialog = {
                                    id: "noUrlInStore",
                                    title: "content.dialogs.set-store-url.title",
                                    message: "content.dialogs.set-store-url.message"
                                };
                                dialogService.showNotificationDialog(dialog);
                            }
                        },
                        canExecuteMethod: function () { return true; }
                    },
                    {
                        name: "pageBuilder.commands.open-designer", icon: 'fa fa-crop',
                        executeMethod: function () {
                            runDesigner();
                        },
                        canExecuteMethod: function () { return true; }
                    }
                ];
            }

            blade.toolbarCommands = blade.toolbarCommands || [];

            function isDirty() {
                return !angular.equals(blade.currentEntity, blade.origEntity) && blade.hasUpdatePermission();
            }

            function canSave() {
                return isDirty() && formScope && formScope.$valid;
            }

            function generatePath() {
                // need to return path relative to the root folder
                return blade.currentEntity.settings.permalink
                    ? '/pages/' + blade.currentEntity.settings.permalink
                    : blade.currentEntity.relativeUrl;
            }

            function runDesigner() {
                if (blade.designerUrl) {
                    // /Modules/VirtoCommerce.PageBuilderModule/Content/builder/
                    var path = blade.currentEntity.relativeUrl;
                    window.open(blade.designerUrl + '?path=' + path + '&storeId=' + blade.storeId + '&contentType=' + blade.contentType, '_blank');
                } else {
                    var dialog = {
                        id: "noUrlInStore",
                        title: "content.dialogs.set-designer-url.title",
                        message: "content.dialogs.set-designer-url.message"
                    };
                    dialogService.showNotificationDialog(dialog);
                }
            }

            blade.onClose = function (closeCallback) {
                bladeNavigationService.showConfirmationIfNeeded(isDirty(), canSave(), blade, $scope.saveChanges, closeCallback, "content.dialogs.page-save.title", "content.dialogs.page-save.message");
            };

            var formScope;
            $scope.setForm = function (form) { $scope.formScope = formScope = form; };

            $scope.getDictionaryValues = function (property, callback) {
                dictionaryItemsApi.query({ id: property.objectType, propertyId: property.id }, callback);
            };

            $scope.languages = settings.getValues({ id: 'VirtoCommerce.Core.General.Languages' });

            $scope.options = [
                { label: "Theme", value: "theme" },
                { label: "Empty", value: "empty" },
                { label: "Glossary", value: "glossary" }
            ];

            blade.headIcon = 'fa-inbox';

            blade.initialize();
        }]);

