import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStripeComponent } from './custom-stripe.component';

describe('CustomStripeComponent', () => {
  let component: CustomStripeComponent;
  let fixture: ComponentFixture<CustomStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
