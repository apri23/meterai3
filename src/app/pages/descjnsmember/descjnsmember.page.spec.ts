import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescjnsmemberPage } from './descjnsmember.page';

describe('DescjnsmemberPage', () => {
  let component: DescjnsmemberPage;
  let fixture: ComponentFixture<DescjnsmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescjnsmemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescjnsmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
