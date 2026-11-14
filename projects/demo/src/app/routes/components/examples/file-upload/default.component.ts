import { Component } from '@angular/core';
import { NgxGovukFileUpload } from 'ngx-govuk/file-upload';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';

@Component({
  selector: 'app-file-upload-demo',
  imports: [NgxGovukFormGroup, NgxGovukFileUpload],
  templateUrl: './default.component.html',
})
export class FileUploadDemoComponent {}
