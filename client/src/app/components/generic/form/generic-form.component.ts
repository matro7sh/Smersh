import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractRouter } from 'src/app/router/router';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { Input } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

type Item = Record<string, unknown | unknown[]> | AbstractModelApplication;

@Component({
  templateUrl: 'generic-form.component.html',
})
export class GenericFormComponent implements OnInit {
  public formType = '';
  item: Item;
  public inputs: Input[] = [];
  public routerHelper = AbstractRouter;
  public dataSource: MatTableDataSource<AbstractModelApplication>;
  public resource = '';
  public paginator = {
    page: 1,
    itemsPerPage: 10,
    count: 0,
    options: [10, 25, 50],
  };
  public singularResource = '';
  public actionMatcher = null;
  public fields = [];
  public filters = ['name'];
  protected excludedFields = ['@id', '@type'];
  public period = new FormGroup({
    start: new FormControl(),
    stop: new FormControl(),
  });

  constructor(
    protected service: AbstractService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {}

  public initialize(): void {
    return;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4 * 1000,
    });
  }

  ngOnInit(): void {
    this.initialize();
    return;
  }

  getItem(): Item {
    return this.item;
  }

  setItem(value: Record<string, unknown | unknown[]>): void {
    this.item = value;
  }

  getInputValue({ name }: Input): unknown {
    return this.item?.[name.toString()];
  }

  update(value: Record<string, unknown | unknown[]>): void {
    this.item = {
      ...this.item,
      ...value,
    };
  }

  itemTransformer(): Record<string, string> {
    const entries = Object.entries(this.item ?? {}).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.map(({ value }) => value) : v?.value ?? v,
    ]);
    return entries.reduce((acc, [k, v]) => {
      acc[k.toString()] = v;
      return acc;
    }, {});
  }

  onSubmit(_: NgForm): void {}

  notifyActionSuccessAndRedirect(action: string): void {
    this.openSnackBar(`The ${this.singularResource} has been ${action}`);
    this.router.navigateByUrl(this.routerHelper.redirectToList());
  }
}
