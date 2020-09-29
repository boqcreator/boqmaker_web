import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectionPage } from './projection.page';

describe('ProjectionPage', () => {
  let component: ProjectionPage;
  let fixture: ComponentFixture<ProjectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
