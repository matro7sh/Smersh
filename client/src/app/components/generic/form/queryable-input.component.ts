import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsersService } from 'src/app/services/users.service';
import { MatOption } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-queryable-input',
  templateUrl: './queryable-input.component.html',
  styleUrls: [],
})
export class QueryableInputComponent implements OnInit {
  public records: Record<string, string>[] = [];
  public record: MatOption = null;
  public multiple = false;
  public selectedRecords: MatOption[] = [];
  public name = '';
  @Input() public input;
  public source = 'name';
  protected filters = {};
  queryableInputControl: FormControl = new FormControl();
  separators: number[] = [ENTER, COMMA];
  @Output() updateValue = new EventEmitter<
    Record<string, unknown | unknown[]>
  >();
  @Input() public updateParentModel: (
    value: Record<string, unknown | unknown[]>
  ) => void;

  constructor(protected service: UsersService) {}

  fetch(params: Record<string, string> = {}): void {
    this.service
      .getData({ ...this.filters, ...params })
      .then(({ data }: { data: AbstractModelApplication[] }) => {
        this.records = data.map((item) => ({
          label: item[this.source] ?? item.id,
          value: item['@id'],
        }));
      });
  }

  parse(data: Record<string, string>): string {
    return data?.label ?? '';
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
