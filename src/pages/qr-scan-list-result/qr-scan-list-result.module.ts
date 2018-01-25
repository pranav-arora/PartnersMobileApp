import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrScanListResultPage } from './qr-scan-list-result';

@NgModule({
  declarations: [
    QrScanListResultPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScanListResultPage),
  ],
})
export class QrScanListResultPageModule {}
