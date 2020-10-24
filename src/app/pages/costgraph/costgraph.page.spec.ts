import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostgraphPage } from './costgraph.page';

describe('CostgraphPage', () => {
  let component: CostgraphPage;
  let fixture: ComponentFixture<CostgraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostgraphPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostgraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
