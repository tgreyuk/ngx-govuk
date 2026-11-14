import { Component } from '@angular/core';
import {
  NgxGovukEnhancedFileUpload,
  NgxGovukFileUpload,
} from 'ngx-govuk/file-upload';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';

@Component({
  selector: 'app-file-upload-enhanced-demo',
  imports: [NgxGovukFormGroup, NgxGovukFileUpload, NgxGovukEnhancedFileUpload],
  templateUrl: './enhanced.component.html',
})
export class FileUploadEnhancedDemoComponent {}
