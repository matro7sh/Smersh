export const LIST_ROUTE = '';
export const CREATE_ROUTE = 'create';
export const EDIT_ROUTE = ':id/edit';
export const SHOW_ROUTE = ':id';

export abstract class AbstractRouter {
  protected static resource = '';

  public static getIdFromIRI(iri: string): string {
    return iri.split('/').pop();
  }

  public static redirectTo(params: string): string {
    return `/${this.resource}${params}`;
  }

  public static redirectToEdit(id: string): string {
    return this.redirectTo(`/${EDIT_ROUTE.replace(':id', id)}`);
  }

  public static redirectToEditFromIRI(id: string): string {
    return this.redirectToEdit(this.getIdFromIRI(id));
  }

  public static redirectToCreate(): string {
    return this.redirectTo(`/${CREATE_ROUTE}`);
  }

  public static redirectToShow(id: string): string {
    return this.redirectTo(`/${SHOW_ROUTE.replace(':id', id)}`);
  }

  public static redirectToShowFromIRI(id: string): string {
    return this.redirectToShow(id.split('/').pop());
  }

  public static redirectToList(): string {
    return this.redirectTo(LIST_ROUTE);
  }

  public static redirectToListFromIRI(): string {
    return this.redirectToList();
  }
}
