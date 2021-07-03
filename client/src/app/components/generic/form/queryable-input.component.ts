import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AbstractRouter } from 'src/app/router/router';
import { Input as InputModel } from 'src/app/form/Input';
import { AbstractService } from 'src/app/services/abstract';

@Component({
  selector: 'app-queryable-input',
  templateUrl: './queryable-input.component.html',
  styleUrls: [],
})
export class QueryableInputComponent implements OnInit, OnChanges {
  @Input() public input: InputModel;
  @Input() public item;
  public records: Record<string, string>[] = [];
  public record: MatOption = null;
  public multiple = false;
  public selectedRecords: MatOption[] = [];
  public name = '';
  public source = 'name';
  queryableInputControl: FormControl = new FormControl();
  separators: number[] = [ENTER, COMMA];
  @Output() updateValue = new EventEmitter<
    Record<string, unknown | unknown[]>
  >();
  @Input() public updateParentModel: (
    value: Record<string, unknown | unknown[]>
  ) => void;
  protected filters = {};
  protected service: AbstractService;

  constructor() {
    this.service = this.input?.service;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.fetch();
    }
  }

  retrieveInformations(
    data: AbstractModelApplication[]
  ): Promise<AbstractModelApplication> {
    const currentSelectedItem = this.item?.['@id'] ?? this.item;
    if (!currentSelectedItem) {
      return new Promise<AbstractModelApplication>((resolve) =>
        resolve(undefined)
      );
    }
    const value = data.find(
      (item) =>
        (currentSelectedItem?.value ?? currentSelectedItem) === item['@id']
    );

    if (value === undefined) {
      return (this.input as InputModel).service.getDataById(
        AbstractRouter.getIdFromIRI(currentSelectedItem)
      );
    }

    return new Promise<AbstractModelApplication>((resolve) => resolve(value));
  }

  fetch(params: Record<string, string> = {}): void {
    this.service
      ?.getData({ ...this.filters, ...params })
      .then(({ data }: { data: AbstractModelApplication[] }) => {
        this.records = data.map((item) => ({
          label: item[this.source] ?? item.id,
          value: item['@id'],
        }));

        if (Array.isArray(this.item)) {
          this.selectedRecords = this.item.map(
            (item) =>
              ({
                label: item.label ?? item[this.source] ?? item.id,
                value: item.value ?? item['@id'],
              } as unknown)
          ) as MatOption[];
        } else {
          this.retrieveInformations(data).then((item) => {
            if (item) {
              this.queryableInputControl.setValue({
                label: item[this.source] ?? item.id,
                value: item['@id'],
              });
            }
          });
        }
      });
  }

  parse(data: Record<string, string> | string): string {
    if (data) {
      return (data as Record<string, string>).label ?? (data as string) ?? '';
    }
    return '';
  }

  onSelected({ option: { value } }: MatAutocompleteSelectedEvent): void {
    let selectedValue = value;
    if (this.multiple) {
      if (!this.selectedRecords.some((item) => item.value === value.value)) {
        this.selectedRecords.push(value);
      }
      selectedValue = this.selectedRecords;
    } else {
      this.record = value;
    }
    this.updateValue.emit({ [this.name]: selectedValue });
  }

  remove({ value }: MatOption): void {
    this.selectedRecords = this.selectedRecords.filter(
      (item) => item.value !== value
    );
    this.updateValue.emit({ [this.name]: this.selectedRecords });
  }

  ngOnInit(): void {
    Object.entries(this.input ?? {}).map(([k, v]) => {
      this[k.toString()] = v;
    });
    this.queryableInputControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((v) => {
        if (v.value) {
          return;
        }
        this.fetch({ [this.source]: v });
      });
    this.fetch();
  }
}
