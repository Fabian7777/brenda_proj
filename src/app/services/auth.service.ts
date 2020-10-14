import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = 'https://neolitepharmacy.com/brenda_proj/api/';
  client_id = 'android';
  app_name = 'BELIN LAUNDRIES';

  constructor(private http: HttpClient) {

   }

   post_without_tokens(credentials, type) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:object-literal-shorthand
      this.http.post(this.server + type, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  post_with_tokens(credentials, type) {
    const usertoken: string = JSON.parse(localStorage.getItem('device_token'));
    const httpHeader = {
      headers: new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + usertoken })
    };
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:object-literal-shorthand
      this.http.post(this.server + type, JSON.stringify(credentials), httpHeader)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  uploadFile(formData) {
    return this.http.post(this.server+'upload_post', formData);
  }


  get_with_tokens(type) {
    const usertoken: string = JSON.parse(localStorage.getItem('device_token'));
    const httpHeader = {
      // tslint:disable-next-line:max-line-length
      headers: new HttpHeaders({ 'Content-Type': 'authorization', 'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + usertoken })
    };
    return new Promise((resolve, reject) => {
      this.http.get(this.server + type, httpHeader)
        .subscribe(res => {
          resolve((res));
        }, (err) => {
          reject(err);
        });
    });
  }

  get_without_tokens(type) {
    return new Promise((resolve, reject) => {
      this.http.get(this.server + type)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
