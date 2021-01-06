export class AbstractStorage {
  protected key = '';

  public get(): string {
    return localStorage.getItem(this.key) ?? '';
  }

  public set(value: string): void {
    localStorage.setItem(this.key, value);
  }

  public reset(): void {
    localStorage.removeItem(this.key);
  }
}
