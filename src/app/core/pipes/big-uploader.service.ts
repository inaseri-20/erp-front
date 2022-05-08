import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BigUploaderService {


  private uploaded$$ = new BehaviorSubject<any>(null);
  uploaded$ = this.uploaded$$.asObservable();

  constructor(private alertService: AlertService) {
  }

  async uploadFile(file: any, key: string, chunkSize: number): Promise<any> {

    const url = `${environment.apiUrl}file/chunk/`;

    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);
      let percentageUploaded = (start / file.size) * 100;
      percentageUploaded = Math.round(percentageUploaded);

      const fd = new FormData();

      fd.set('file', chunk);
      fd.set('key', key);
      fd.set('fileName', file.name);
      fd.set('fileSize', file.size);
      fd.set('chunk_size', chunkSize.toString());

      const header = {
        Authorization: `Bearer ${localStorage.getItem('erpAccessToken')}`
      };
      try {
        await fetch(url, {method: 'post', body: fd, headers: header});
        this.setUploaded(percentageUploaded);
      } catch (error) {
        this.alertService.messageError('در بارگزاری فایل خطایی رخ داده است');
        this.setUploaded(start);
        break;
      }
    }
  }

  async uploadFileAgain(file: any, key: string, state: number, chunkSize: number): Promise<any> {

    const url = `${environment.apiUrl}file/chunk/`;

    for (let start = state; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);
      let percentageUploaded = (start / file.size) * 100;
      percentageUploaded = Math.round(percentageUploaded);

      const fd = new FormData();

      fd.set('file', chunk);
      fd.set('key', key);
      fd.set('fileName', file.name);
      fd.set('fileSize', file.size);
      fd.set('chunk_size', chunkSize.toString());

      const header = {
        Authorization: `Bearer ${localStorage.getItem('erpAccessToken')}`
      };
      try {
        await fetch(url, {method: 'post', body: fd, headers: header});
        this.setUploaded(percentageUploaded);
      } catch (error) {
        this.alertService.messageError('در بارگزاری فایل خطایی رخ داده است');
        this.setUploaded(start);
        break;
      }
    }
  }

  setUploaded(isLoading: number): void {
    this.uploaded$$.next(isLoading);
  }
}
