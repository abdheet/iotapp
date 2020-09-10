import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateThingComponent } from './allocate-thing.component';

describe('AllocateThingComponent', () => {
  let component: AllocateThingComponent;
  let fixture: ComponentFixture<AllocateThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
