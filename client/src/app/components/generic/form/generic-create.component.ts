import { GenericFormComponent } from './generic-form.component';
import { NgForm } from '@angular/forms';

export abstract class GenericCreateComponent extends GenericFormComponent {
  formType = 'Create';

  onSubmit({ value }: NgForm): void {
    console.log(value);
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
