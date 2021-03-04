import { AbstractService } from 'src/app/services/abstract';

export class FilterService {
  private timeout;
  private filters = {};

  constructor(protected service: AbstractService) {}

  public applyFilter(
    filterValue: string,
    value: string,
    callback: (params: Record<string, string>) => void
  ): void {
    this.filters[filterValue] = value;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      callback(this.filters);
      this.timeout = null;
    }, 500);
  }
}
