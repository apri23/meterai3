import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditdataakunPage } from './editdataakun.page';

describe('EditdataakunPage', () => {
  let component: EditdataakunPage;
  let fixture: ComponentFixture<EditdataakunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdataakunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditdataakunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
