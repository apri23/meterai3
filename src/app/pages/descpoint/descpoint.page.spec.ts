import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescpointPage } from './descpoint.page';

describe('DescpointPage', () => {
  let component: DescpointPage;
  let fixture: ComponentFixture<DescpointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescpointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescpointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
