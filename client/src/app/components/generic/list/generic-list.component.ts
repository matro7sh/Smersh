import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractRouter } from 'src/app/router/router';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { FilterService } from 'src/app/services/filter.service';
import { PageEvent } from '@angular/material/paginator';
import {
  API_CREATE_ACTION,
  API_DELETE_ACTION,
  API_GET_ITEM_ACTION,
  API_UPDATE_ACTION,
  isGranted,
} from 'src/app/security/isGranted';

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
  color: 'accent',
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
  private filterService;

  constructor(protected service: AbstractService, protected router: Router) {
    this.dataSource = new MatTableDataSource();
    this.filterService = new FilterService(service);
    this.actionMatcher = new RegExp(
      `^${this.actions.map((action) => action.name).join('|')}$`,
      'gi'
    );
  }

  getPermissions(): Record<string, string> {
    const permissions = {};
    this.buttonActions
      .filter((button) =>
        isGranted(
          `${this.getBaseRoleForResource()}${this.getAPIAction(button.name)}`
        )
      )
      .forEach((action) => (permissions[action.name] = action.color));
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

  retrieveData(params: Record<string, string> = {}): void {
    this.service
      ?.getData({
        ...params,
        page: this.paginator.page.toString(),
        itemsPerPage: this.paginator.itemsPerPage.toString(),
      })
      .then(({
               count,
               data
             }) => {
        this.paginator.count = count;
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

  applyFilter(filterValue: string, {value}: HTMLInputElement): void {
    this.filterService.applyFilter(
      {[filterValue]: value},
      (data: Record<string, string>) => this.retrieveData(data)
    );
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

  onUpdatePaginator(event: PageEvent): void {
    if (this.paginator.itemsPerPage !== event.pageSize) {
      this.paginator.itemsPerPage = event.pageSize;
    }
    if (this.paginator.page !== event.pageIndex + 1) {
      this.paginator.page = event.pageIndex + 1;
    }

    this.filterService.applyFilter({}, (data: Record<string, string>) =>
      this.retrieveData(data)
    );
  }

  isEnabledCreation(): boolean {
    return (
      this.actions.some((e) => e.name === CREATE_ACTION) &&
      isGranted(`${this.getBaseRoleForResource()}POST`)
    );
  }

  getAPIAction(field: string): string {
    switch (field) {
      case SHOW_ACTION:
        return API_GET_ITEM_ACTION;
      case CREATE_ACTION:
        return API_CREATE_ACTION;
      case EDIT_ACTION:
        return API_UPDATE_ACTION;
      case DELETE_ACTION:
        return API_DELETE_ACTION;
    }
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

  protected getBaseRoleForResource(): string {
    return `ROLE_${this.resource.slice(0, -1).toUpperCase()}_`;
  }
}
