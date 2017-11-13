import {Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {VERSION} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export interface Tag {
  id: number;
  text: string;
}

export interface Person {
  name: string;
  status: Tag[]
}

@Component({
  selector: 'app-list-chips-person',
  templateUrl: './list-chips-person.component.html',
  styleUrls: ['./list-chips-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChipsPersonComponent implements OnInit { 
  version = VERSION;
  form: FormGroup;
  person: Person = {name: '', status: []};
  source: Tag[] = [
    {'id': 1, 'text': 'flying'}, 
    {'id': 2, 'text':'home'},
    {'id': 3, 'text':'coding'}
    ];
  routes: Object[] = [
      {
          title: 'Dashboard', route: '/dashboard', icon: 'dashboard'
      },
      {
          title: 'People', route: '/person', icon: 'people'
      },
      {
          title: 'Interactions', route: '/interaction', icon: 'forum'
      },
      {
          title: 'Events', route: '', icon: 'today'
      },
      {
          title: 'Groups', route: '', icon: 'people_outline'
      },
      {
          title: 'Settings', route: '/settings', icon: 'build'
      }
  ];
  
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      name: [this.person.name],
      status: [this.person.status]
    });

    this.form.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((data: Person) => {
              this.person = data;
            });
  }

  onKey(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
          this.save(this.form.getRawValue());
      }
  }

  save(model: Person): void {
      if (this.form.valid) {
          this.form.patchValue(model);
      }
  }

}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */