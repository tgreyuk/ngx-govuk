import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxGovukUtilsService {
  /**
   * Creates a random id with the given prefix, such as `field-a1B2c3D4e5`, for
   * linking elements on a page, such as a label to its field.
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
