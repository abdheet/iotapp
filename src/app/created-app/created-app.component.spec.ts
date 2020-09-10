import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedAppComponent } from './created-app.component';

describe('CreatedAppComponent', () => {
  let component: CreatedAppComponent;
  let fixture: ComponentFixture<CreatedAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
