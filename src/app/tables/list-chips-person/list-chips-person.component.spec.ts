import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChipsPersonComponent } from './list-chips-person.component';

describe('ListChipsPersonComponent', () => {
  let component: ListChipsPersonComponent;
  let fixture: ComponentFixture<ListChipsPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChipsPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChipsPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
