import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxGovukUtilsService {
  /**
   * Create a random id for use with components
   *
   * This is an alternative to having an external library as a dependency.
   */
  randomId(prefix = '') {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = 10;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return [prefix, result].join('-');
  }
}
