import { ApiUrlsService } from 'src/app/services/api-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '@app/services';

@Injectable({
    providedIn: 'root'
})
export class FilesService {

    constructor(private http: HttpClient, private urls: ApiUrlsService) { }

    uploadFile(file: File, name: string): Observable<string> {
        const url = this.urls.generateUploadAssetUrl(name);
        const form = new FormData();
        form.append('uploadedFile', file, name);
        return this.http.post<FileDescriptor[]>(url, form).pipe(
            map(x => this.urls.getAssetsRelativeUrl(name))
        );
    }

}
interface FileDescriptor {
    contentType: string;
    fileName: string;
    key: string;
    mimeType: string;
    name: string;
    relativeUrl: string;
    size: number;
    url: string;
}
