import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatSort,
  MatPaginator,
  MatChipInputEvent,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatListOptionChange
  } from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

const COMMA = 188;


@Component({
  selector: 'app-sort-paginate-table',
  templateUrl: './sort-paginate-table.component.html',
  styleUrls: ['./sort-paginate-table.component.css']
})
export class SortPaginateTableComponent {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;


  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  

  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  addFromOutside(): void  {
    console.log('Just a dummy fruit');
    this.fruits.push({ name: 'Just a dummy fruit' });
  }

  // onOptionSelectionChange: (event?: MatListOptionChange) => void = () => {
  //   console.log('Just a dummy fruit');
  //   this.fruits.push({ name: 'Just a dummy fruit' });
  // }


  onOptionSelectionChange (item: string): void {
    console.log('Just a dummy fruit');
    this.fruits.push({ name: 'Just a dummy fruit' });
  }


  displayedColumns = ['filterUserId', 'userId', 'userName', 'progress', 'filterColor', 'color'];

  // displayedColumns = ['userId', 'userName', 'progress', 'color'];


  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];


  abcdCOLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];

  abcdNAMES = ['Maia AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Asher', 'Olivia AAAAAAAAAAAAAAAAAAAAAA', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Oliver', 'Isabella AAAAAAAAAAAAAAAAAAAAAA', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur AAAAAAAAAAAAAAAAAAAAAA', 'Mia', 'Thomas', 'Elizabeth'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort,this.paginator);
  }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Asher', 'Olivia AAAAAAAAAAAAAAAAAAAAAA', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'Oliver', 'Isabella AAAAAAAAAAAAAAAAAAAAAA', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur AAAAAAAAAAAAAAAAAAAAAA', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData().slice();

      
      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);

    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): UserData[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'filterUserId': break;
        case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
        case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}