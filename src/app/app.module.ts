import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AccessProvider } from './providers/access-providers';

import { ReactiveFormsModule } from '@angular/forms';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { ModalPageModule } from './pages/modal/modal.module';
import { PopoverPageModule } from './pages/popover/popover.module';
import { UbahalamatPageModule } from './pages/ubahalamat/ubahalamat.module';
import { DescpointPageModule } from './pages/descpoint/descpoint.module';
import { DescjnsmemberPageModule } from './pages/descjnsmember/descjnsmember.module';
import { DesctransaksiPageModule } from './pages/desctransaksi/desctransaksi.module';
import { DesctentangPageModule } from './pages/desctentang/desctentang.module';
import { ResetpassPageModule } from './pages/resetpass/resetpass.module';
import { EditdataakunPageModule } from './pages/editdataakun/editdataakun.module';
import { EditdatapribadiPageModule } from './pages/editdatapribadi/editdatapribadi.module';

import { LacakkirimanPageModule } from './lacakkiriman/lacakkiriman.module';

import { IntrusksipembayaranPageModule } from './intrusksipembayaran/intrusksipembayaran.module';

import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule, 
  	IonicStorageModule.forRoot(),
  	HttpClientModule,
    ReactiveFormsModule,
    ModalPageModule,
    PopoverPageModule,
    UbahalamatPageModule,
    IntrusksipembayaranPageModule,
    DescpointPageModule,
    DescjnsmemberPageModule,
    DesctransaksiPageModule,
    DesctentangPageModule,
    LacakkirimanPageModule,
    ResetpassPageModule,
    EditdataakunPageModule,
    EditdatapribadiPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AccessProvider,
    Camera,
    File,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Clipboard,
    AppVersion,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
