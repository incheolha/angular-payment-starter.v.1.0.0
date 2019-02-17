import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamporterHomeComponent } from './iamporter-home.component';

describe('IamporterHomeComponent', () => {
  let component: IamporterHomeComponent;
  let fixture: ComponentFixture<IamporterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamporterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamporterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
