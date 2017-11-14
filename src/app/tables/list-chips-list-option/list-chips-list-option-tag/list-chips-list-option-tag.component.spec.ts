import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChipsListOptionTagComponent } from './list-chips-list-option-tag.component';

describe('ListChipsListOptionTagComponent', () => {
  let component: ListChipsListOptionTagComponent;
  let fixture: ComponentFixture<ListChipsListOptionTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChipsListOptionTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChipsListOptionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
