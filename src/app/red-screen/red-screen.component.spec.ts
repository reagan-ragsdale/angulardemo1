import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedScreenComponent } from './red-screen.component';

describe('RedScreenComponent', () => {
  let component: RedScreenComponent;
  let fixture: ComponentFixture<RedScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedScreenComponent]
    });
    fixture = TestBed.createComponent(RedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
