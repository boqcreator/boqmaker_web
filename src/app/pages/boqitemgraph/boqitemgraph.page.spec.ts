import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoqitemgraphPage } from './boqitemgraph.page';

describe('BoqitemgraphPage', () => {
  let component: BoqitemgraphPage;
  let fixture: ComponentFixture<BoqitemgraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqitemgraphPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoqitemgraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
