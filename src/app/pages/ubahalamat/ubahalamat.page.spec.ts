import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbahalamatPage } from './ubahalamat.page';

describe('UbahalamatPage', () => {
  let component: UbahalamatPage;
  let fixture: ComponentFixture<UbahalamatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahalamatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbahalamatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
