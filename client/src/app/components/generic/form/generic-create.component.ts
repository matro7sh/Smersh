import { GenericFormComponent } from './generic-form.component';
import { NgForm } from '@angular/forms';

export abstract class GenericCreateComponent extends GenericFormComponent {
  formType = 'Create';

  itemTransformer(): Record<string, string> {
    const entries = Object.entries(this.item).map(([k, v]) => [
      k,
      v.value ?? v,
    ]);
    return entries.reduce((acc, [k, v]) => {
      acc[k.toString()] = v;
      return acc;
    }, {});
  }

  onSubmit({ value }: NgForm): void {
    this.service
      .insert({ ...this.itemTransformer(), ...value })
      .then(() => {
        this.notifyActionSuccessAndRedirect('created');
      })
      .catch(({ error: { ['hydra:description']: error }, status }) => {
        if (status === '400') {
          this.openSnackBar(`Error : ${error}`);
        }
      });
  }
}
