import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChipsListOptionComponent } from './list-chips-list-option.component';

describe('ListChipsListOptionComponent', () => {
  let component: ListChipsListOptionComponent;
  let fixture: ComponentFixture<ListChipsListOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChipsListOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChipsListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
