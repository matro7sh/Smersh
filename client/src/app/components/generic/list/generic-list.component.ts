import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractRouter } from 'src/app/router/router';

const DELETE_ACTION = 'delete';
const EDIT_ACTION = 'edit';
const SHOW_ACTION = 'show';
const CREATE_ACTION = 'create';

export const DELETE = {
  color: 'warn',
  label: 'Delete',
  name: DELETE_ACTION,
};
export const EDIT = {
  color: '',
  label: 'Edit',
  name: EDIT_ACTION,
};
export const CREATE = {
  color: '',
  label: 'Create a new ',
  name: CREATE_ACTION,
};
export const SHOW = {
  color: 'primary',
  label: 'Show',
  name: SHOW_ACTION,
};

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: [],
})
export class GenericListComponent implements OnInit {
  public buttonActions = [SHOW, EDIT, DELETE];
  public actions = [...this.buttonActions, CREATE];
  public routerHelper = AbstractRouter;
  public dataSource: MatTableDataSource<any>;
  public resource = '';
  public singularResource = '';
  public actionMatcher = null;
  public fields = [];
  public filters = [];
  protected excludedFields = ['@id', '@type'];

  constructor(protected service: AbstractService, protected router: Router) {
    this.dataSource = new MatTableDataSource();
    this.actionMatcher = new RegExp(
      `^${this.actions.map((action) => action.name).join('|')}$`,
      'gi'
    );
  }

  getPermissions(): Record<string, string> {
    const permissions = {};
    this.buttonActions.forEach(
      (action) => (permissions[action.name] = action.color)
    );
    return permissions;
  }

  notifyReceipt(data: unknown[]): void {
    if (!this.fields.length) {
      this.fields = Object.entries(data[0] ?? {})
        .filter(
          ([key, obj]) =>
            typeof obj !== 'object' && !this.excludedFields.includes(key)
        )
        .map(([name]) => name);
    }
  }

  retrieveData(): void {
    this.service?.getData().then((data) => {
      const items = data.map((e) => ({
        ...e,
        ...this.getPermissions(),
      }));
      this.dataSource.data = items;
      this.notifyReceipt(items);
    });
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectAction(action: string, params: string): void {
    let path = '';
    switch (action) {
      case EDIT_ACTION:
        path = this.routerHelper.redirectToEdit(params);
        break;
      case SHOW_ACTION:
        path = this.routerHelper.redirectToShow(params);
        break;
    }
    this.router.navigate([path]);
  }

  deleteAction(id: string): void {
    if (confirm('Are you sure to delete ')) {
      this.service.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  isEnabledCreation(): boolean {
    return this.actions.some((e) => e.name === CREATE_ACTION);
  }

  applyActionOnResource(action: string, id: string): void {
    switch (action) {
      case DELETE_ACTION:
        this.deleteAction(id);
        break;
      default:
        this.redirectAction(action, id);
        break;
    }
  }
}
