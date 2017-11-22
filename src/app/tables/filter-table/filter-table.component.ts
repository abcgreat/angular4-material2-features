import {Component, ViewChild, OnInit, ElementRef, forwardRef, OnChanges,
  Output, Input, EventEmitter, QueryList, AfterViewInit, Renderer} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatSort,
  MatPaginator,
  MatChipInputEvent,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatListOptionChange,
  MatListOption,
  MatSelectModule,
  MatListModule,
  MatChipList,
  MatButtonModule,
  MatMenuTrigger,
  MatMenu,
  MatMenuItem,
  MAT_MENU_DEFAULT_OPTIONS,
  MatInput,
  MatSelectionList
  } from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import { DataService } from '../data.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

const COMMA = 188;

export interface Tag {
  id: number;
  text: string;
}


@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, AfterViewInit  {
// grab the MatListOption instances..

@ViewChild(MatChipList) chips: MatChipList;

@ViewChild('colorsList', { read: MatSelectionList }) colorsList: MatSelectionList;
// @ViewChild('colorsList') colorsList: QueryList<MatListOption>;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('chips') eachChip: ElementRef;

  @ViewChild(MatMenuTrigger) notificationMenuBtn: MatMenuTrigger;

  @ViewChild(MatMenuTrigger) notificationMenuUserNameBtn: MatMenuTrigger;

  @ViewChild('formUserNameInput', { read: MatInput }) formUserNameInput: MatInput;
  @ViewChild('formUserNameInput') theFormUserNameInput: ElementRef;

  @ViewChild(MatMenu) menuUserName: MatMenu;
  // @ViewChild(string) filtering: string;

  filtering: any;

  filteringColor: string;

  testValue: true;

    config = {
      data: [
        {
          title: 'Title1',
        },
        {
          title: 'Title2',
        },
        {
          title: 'Title3',
        },
        {
          title: 'Title4',
        }
      ]
    };


  onDeselected(value: any) {
    console.log('deselected event => ', value);
  }

  onSelectChange(value: any) {
    // console.log('change => ', value);
    // console.log( value);

    // console.log( value.valueOf());

    // console.log( value.selected);
    
    // console.log('this.filteringColor');
    // console.log(this.filteringColor);
    // console.log( value.source.value.toString());


    // if (typeof(this.filteringColor) !== 'undefined') {
    //   console.log('1. variable is not undefined');
    // } else {
    //   console.log('2. variable is undefined');
    //   this.filteringColor = '';
    // }

    // if (typeof(this.filteringColor) !== 'undefined') {
    //   console.log('1. variable is not undefined');
    // } else {
    //   console.log('2. variable is undefined');
    // }

    // if (this.filteringColor === 'undefined') {
    //   this.filteringColor = 'undefined-----------';
    // }

    // if (this.filteringColor === null) {
    //   this.filteringColor = '';
    // }

    // when selected.
    if (value.selected) {
      // console.log('filteringColors before adding:');
      // console.log(this.filteringColor);

      //value.source.value.toString()
      if (typeof(this.filteringColor) === 'undefined' || this.filteringColor.indexOf(value.source.value.toString()) < 0) {
  
          if (typeof(this.filteringColor) !== 'undefined' && this.filteringColor !== '' ) {
            //console.log('1. variable is not undefined');
            this.filteringColor += ',' + value.source.value.toString();
          } else {
            //console.log('2. variable is undefined');
            // this.filteringColor = '';
            this.filteringColor = value.source.value.toString();
          }
    
          this.fruits.push({ name: 'Color:' + value.source.value.toString()});
          // this.filteringColor += ',' + value.source.value.toString();
    
          //console.log('filteringColors after adding:');
          //console.log(this.filteringColor);
        }

      } else {  // when not unselected.
        this.filteringColor = (this.filteringColor.split(value.source.value.toString())[0] === ',' ? ''
                                : this.filteringColor.split(value.source.value.toString())[0])
        + this.filteringColor.split(value.source.value.toString())[1] ;
        //console.log('filteringColors after removing:');
        console.log(this.filteringColor);

        // Remove from the checklist.

        var tempArray = [];
        tempArray.push({ name: 'Color:' + value.source.value.toString()});
        this.remove(tempArray.pop());
    }

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator,
      this.filter, this.chips, this.filtering, this.filteringColor);

    // console.log('change => !End!');
  }

  submit(rows) {
    console.log(rows.selectedOptions.selected.map(elements => {
      return elements._getHostElement().innerText;
    }));
  }

  displayedColumns = ['filterUserId', 'userId', 'filterUserName', 'userName', 'progress', 'filterColor', 'color'];

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

    someProperty: string = '';

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  source: Tag[] = [
    {'id': 1, 'text': 'flying'},
    {'id': 2, 'text': 'home'},
    {'id': 3, 'text': 'coding'}
    ];

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  fruits = [];
  // fruits = [
  //   { name: 'Lemon' },
  //   { name: 'Lime' },
  //   { name: 'Apple' },
  // ];


  constructor(private dataService: DataService, private renderer: Renderer) {

      }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // console.log('test this: this.filter.nativeElement = value.trim();');

    // console.log('adding a chip');
    // console.log(value);

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator,
      this.filter, this.chips, this.filtering, this.filteringColor);

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    // This is for when list option is unselected.
    if (index < 0) {
      // console.log('if (index < 0)');
      // console.log(this.findIndexFromChips(fruit.name));

      index = this.findIndexFromChips(fruit.name);
    }
    // console.log(fruit.name);
    // console.log(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);

      if (fruit.name.toString().startsWith('Name:')) {
        // remove from the filtering as well.
        // console.log('fruit.name.containing("Name:")');
        this.filtering = '';
      } else if (fruit.name.toString().startsWith('Color:')) {
        // remove from the filtering as well.
        // this.filtering = 'undefined';

        // console.log('filteringColors before removing:');
        // console.log(this.filteringColor);
        // console.log('fruit.name.containing("Color:")');

        var nameOnly = fruit.name.toString().substr(fruit.name.toString().indexOf('Color:') + 6, fruit.name.toString().length - 6);

        // Trim for ','
        this.filteringColor = this.filteringColor.split(nameOnly)[0] + this.filteringColor.split(nameOnly)[1];


        this.filteringColor = this.filteringColor.replace(',,', ',');

        if (this.filteringColor === ',') {
          this.filteringColor = '';
        }


        // Unselect option items //-----------------------------------------------------------------
        this.colorsList.options.find(x => x.value.toString() === nameOnly).selected = false;

        // console.log('filteringColors after removing:');
        // console.log(this.filteringColor);
      }

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator,
        this.filter, this.chips, this.filtering, this.filteringColor);
    }
  }

  findIndexFromChips (element: string) {

    // console.log('inside of findIndexFromChips');
    // console.log(element);
    var indexFound = -1;

    // console.log(this.fruits.length);

    var index = 0;

    this.fruits.forEach(x => {

      // console.log(x);
      // console.log(x.name);
      // console.log(x.name.toString());
      // console.log(index);

      if (x.name.toString() === element) {
        indexFound = index;
        // console.log('found the mathch!');
        return indexFound;
      }

      index++;
    });

    return indexFound;
  }

  addFromOutside(): void  {
    // console.log('Just a dummy fruit');
    this.fruits.push({ name: 'Just a dummy fruit' });
  }

  onOptionSelectionChange (item: string): void {
    // console.log('Just a dummy fruit');
    this.fruits.push({ name: 'Just a dummy fruit' });
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator,
      this.filter, this.chips, this.filtering, this.filteringColor);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  onOpenMenu(menu: any): void {
    console.log('inside of onOpenMenu(menu: any): void');
  }

  ngAfterViewInit() {

    this.notificationMenuBtn.onMenuOpen.subscribe(() => {
      //console.log('method 1');
    });

    this.notificationMenuUserNameBtn.menuOpened.subscribe(() => {
      //console.log('method 1.1');
    });
  }

materialFocus(event) {
  //console.log('event');

  this.formUserNameInput.focus();
}

  menuHasOpened() {
    console.log('method 2');
  }


  focusUserName(value: Element) {
    console.log('it is: focusUserName()');
  }

  //For List Option event
  public change() {
    console.log('This should fire on select change');
  }

  btnMenuUserNameClicked(event) {
    // console.log('Inside of btnMenuUserNameClicked');
    // console.log(this.formUserNameInput);
    // console.log(this.formUserNameInput.value);
    this.fruits.push({ name: 'Name:' + this.formUserNameInput.value.trim() });

    this.filtering = 'Name:' + this.formUserNameInput.value.trim(); //'testing strings...';
    // console.log('testing strings...');
    // console.log(this.filtering);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator,
      this.filter, this.chips, this.filtering, this.filteringColor);
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
  _filterChange = new BehaviorSubject('');
  _colorsChange = new BehaviorSubject('');

  _chipsChange = new BehaviorSubject('');
  _filteringChange = new BehaviorSubject('');

  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  get chips(): any { return this._chipsChange.value; }
  set chips(chips: any) { this._chipsChange.next(chips); }

  get colors(): string { return this._colorsChange.value; }
  set colors(colors: string) { this._colorsChange.next(colors); }

  get filtering(): any { return this._filteringChange.value; }
  set filtering(filtering: any) { this._filteringChange.next(filtering); }

  constructor(private _exampleDatabase: ExampleDatabase,
    private _sort: MatSort,
    private _paginator: MatPaginator,
    private _filter: ElementRef,
    private _chips: MatChipList,
    private _filtering: string,
    private _colors: string) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._paginator.page,
      this._filterChange,
      this._chips.change,
      this._filteringChange,
      this._colorsChange,
    ];

     // If the user changes the sort order, reset back to the first page.
     this._sort.sortChange.subscribe(() => {
       console.log('inside of this._sort.sortChange.subscribe(() => {');
      this._paginator.pageIndex = 0;
    });

    this._chipsChange.subscribe(() => {
      console.log('inside of this._chipsChange.subscribe(() => {');
     this._paginator.pageIndex = 0;
   });


    // this._colorsChange.subscribe(() => {
    //   console.log('inside of this._colorsChange.subscribe(() => {');
    //  this._paginator.pageIndex = 0;
    // });

    // this._chips.chipSelectionChanges.subscribe(() => {
    //   console.log('this._chips.chipSelectionChanges.subscribe(() => {  ');
    //   this._paginator.pageIndex = 0;
    // });

    //  // If the user changes the sort order, reset back to the first page.
    //  this._filter.nativeElement._filterChange.subscribe(() => {
    //   console.log('inside of this._filter.nativeElement._filterChange.subscribe(() => {')
    //   this._paginator.pageIndex = 0;
    // });

    return Observable.merge(...displayDataChanges).map(() => {

      const data = this._exampleDatabase.data.slice().filter((item: UserData) => {
        let searchStr = '';
        searchStr = (item.name).toLowerCase();
        // console.log('this._chips');
        // console.log(this._chips);
        // console.log('this._filtering');
        // console.log(this._filtering);
        // console.log(this.filtering);
        // console.log(this._chips._chipInput._chipList.chips._results[0].value);
        // console.log('show item.name:' + item.color);
        // console.log('show filter value:' + this.filter);
        // console.log('_chips');

        // console.log('colors (before): ');
        // console.log(this.colors);
        // console.log(this._colors);

        // console.log('this.tmpFilter (before): ');
        // console.log(tmpFilter);
        // console.log(this.filtering);

        var tmpFilter;
        //  = this._filtering.toLowerCase();
        var pass = false;

        var doesNotHaveFilter = true;


        if (this._filtering != null && this._filtering.startsWith('Name:')) {
          // searchStr = (item.name).toLowerCase();
          doesNotHaveFilter = false;
          tmpFilter = this._filtering.toLowerCase();

          tmpFilter = tmpFilter.substr(5, tmpFilter.length - 5);
          // this._filtering = this._filtering.substr(this._filtering.indexOf('Name:'), this._filtering.length);

          pass = searchStr.indexOf(tmpFilter) !== -1;

          //return searchStr.indexOf(tmpFilter) !== -1;
          // console.log('Yes Name is in it.');
          // console.log(searchStr);
          // console.log('pass');
          // console.log(pass);
          if (pass) {
            return pass;
          }
        }

        // uncomment later
        if (!pass) {
          if (this._colors != null) {
            doesNotHaveFilter = false;
            tmpFilter = this._colors.toLowerCase();

            pass = tmpFilter.indexOf(item.color) !== -1;
            // console.log('Yes Color is in it.');
            // console.log(this._colors);
  
            // console.log('pass');
            // console.log(pass);
            if (pass) {
              return pass;
            }
          }
        }

        // console.log('this.tmpFilter (after): ');
        // console.log(tmpFilter);

        // console.log(this._chips);
        // if (this.filter.startsWith('Name:')){
        //   searchStr = (item.name).toLowerCase();
        //   //this.filter = this.filter.substr(this.filter.indexOf('Name:'),this.filter.length);
        // } else if (this.filter.startsWith('Color:')){
        //   searchStr = (item.color).toLowerCase();
        // } else if (this.filter.startsWith('Progress:')){
        //   searchStr = (item.progress).toLowerCase();
        // } else if (this.filter.startsWith('ID:')){
        //   searchStr = (item.id).toLowerCase();
        // }

        //return true; //.indexOf(tmpFilter) !== -1;
        // return (pass || !doesNotHaveFilter) || (!pass && !doesNotHaveFilter);


        return doesNotHaveFilter || pass;
      });

      // console.log('before returning the data:');
      // console.log('const startIndex = this._paginator.pageIndex * this._paginator.pageSize;');
      // console.log('return data.splice(startIndex, this._paginator.pageSize);');

      // console.log('data.length)');
      // console.log(data.length);
      this._paginator.length = data.length;
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