import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChipsPersonTagComponent } from './list-chips-person-tag.component';

describe('ListChipsPersonTagComponent', () => {
  let component: ListChipsPersonTagComponent;
  let fixture: ComponentFixture<ListChipsPersonTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChipsPersonTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChipsPersonTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
