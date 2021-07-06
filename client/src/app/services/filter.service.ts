import { AbstractService } from 'src/app/services/abstract';

export class FilterService {
  private timeout;
  private filters = {};

  constructor(protected service: AbstractService) {
  }

  public applyFilter(
    filters: Record<string, string>,
    callback: (params: Record<string, string>) => void
  ): void {
    this.filters = {...this.filters, ...filters};
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      callback(this.filters);
      this.timeout = null;
    }, 500);
  }
}
