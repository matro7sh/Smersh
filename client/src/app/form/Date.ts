import { Input } from './Input';

abstract class DateInput extends Input {
  public inputType = 'date';

  constructor(props = {}) {
    super();
    Object.entries(props).map(([k, v]) => {
      this[k.toString()] = v;
    });
  }
}

export class RangeDateInput extends DateInput {
  public name = 'period';
  public label = 'Enter a date range';
}
