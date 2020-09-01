import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditdatapribadiPage } from './editdatapribadi.page';

describe('EditdatapribadiPage', () => {
  let component: EditdatapribadiPage;
  let fixture: ComponentFixture<EditdatapribadiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdatapribadiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditdatapribadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
