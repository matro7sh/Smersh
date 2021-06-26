import { GenericFormComponent } from './generic-form.component';
import { NgForm } from '@angular/forms';

export abstract class GenericEditComponent extends GenericFormComponent {
  formType = 'Edit';
  id: string;

  fetchItem(): void {
    this.service.getDataById(this.id).then((item) => {
      this.item = item;
    });
  }

  initialize(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.fetchItem();
    });
  }

  onSubmit({ value }: NgForm): void {
    this.service
      .update(this.id, { ...this.itemTransformer(), ...value })
      .then(() => {
        this.notifyActionSuccessAndRedirect('updated');
      })
      .catch(({ error: { ['hydra:description']: error }, status }) => {
        if (status === '400') {
          this.openSnackBar(`Error : ${error}`);
        }
      });
  }
}
