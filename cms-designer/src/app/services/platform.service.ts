import { ModuleSettings } from './../models/environment.settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiUrlsService } from './api-url.service';
import { PresetsModel } from '@themes/models';
import { BlockValuesModel, BlocksSchema } from '@shared/models';
import { PlatformSetting, StoreSettings } from '@app/models';

import { AppSettings } from './app.settings';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlatformService {

    constructor(private http: HttpClient, private urls: ApiUrlsService) { }

    downloadPreset<T>(filename: string): Observable<T> {
        return this.downloadModel<T>('themes', `/default/config/${filename}`);
    }

    uploadPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config', 'settings_data.json');
    }

    uploadDraftPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config/drafts', this.generateDraftPresetName());
    }

    downloadPage(): Observable<BlockValuesModel[]> {
        return this.downloadModel<BlockValuesModel[]>();
    }

    uploadPage(model: BlockValuesModel[]): Observable<any> {
        return this.uploadModel<BlockValuesModel[]>(model);
    }

    donwloadBlocksSchema(): Observable<BlocksSchema> {
        return this.downloadModel<BlocksSchema>('themes', '/default/config/blocks_schema.json');
    }

    resetCache(): Observable<any> {
        const url = this.urls.generateResetCacheUrl();
        return this.http.post(url, {});
    }

    initSettings(): Promise<any> {
        const parameters = {};
        parameters['StorePreviewPath'] = 'storePreviewPath';
        parameters['TokenUrl'] = 'tokenUrl';
        parameters['AssetsPath'] = 'assetsPath';
        return combineLatest([this.moduleSettings(), this.storeSettings(), this.moduleVersion()]).pipe(
            tap(([moduleSettings, storeSettings, version]) => {
                moduleSettings.forEach(x => {
                    const key = x.name.replace('VirtoCommerce.PageBuilderModule.General.', '');
                    AppSettings[parameters[key]] = x.value || x.defaultValue;
                });
                AppSettings.storeBaseUrl = storeSettings.secureUrl || storeSettings.url;
                environment.version = version;
            })
        ).toPromise();
    }

    private moduleVersion(): Observable<string> {
        const url = this.urls.generateModulesUrl();
        return this.http.get<ModuleSettings[]>(url).pipe(
            map(x => x.find(m => m.id === 'VirtoCommerce.PageBuilderModule')),
            map(x => x.version)
        );
    }

    private moduleSettings(): Observable<PlatformSetting[]> {
        const url = this.urls.generateSettingsUrl();
        return this.http.get<PlatformSetting[]>(url);
    }

    private storeSettings(): Observable<StoreSettings> {
        const url = this.urls.generateStoreSettingsUrl();
        return this.http.get<StoreSettings>(url);
    }

    private downloadModel<T>(contentType: string = null, filepath: string = null): Observable<T> {
        const url = this.urls.generateDownloadUrl(contentType, filepath);
        return this.http.get<T>(url);
    }

    private uploadModel<T>(model: T, contentType: string = null, pathToUpload: string = null, filename: string = null): Observable<any> {
        const url = this.urls.generateUploadUrl(contentType, pathToUpload);
        const form = new FormData();
        form.append(this.urls.chooseFilename(filename), JSON.stringify(model, null, 4));
        return this.http.post(url, form);
    }

    private generateDraftPresetName(): string {
        const prefix = this.urls.getCurrentSessionId();
        return `${prefix}_settings_data.json`;
    }

}
