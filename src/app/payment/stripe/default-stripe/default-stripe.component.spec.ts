import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultStripeComponent } from './default-stripe.component';

describe('DefaultStripeComponent', () => {
  let component: DefaultStripeComponent;
  let fixture: ComponentFixture<DefaultStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
