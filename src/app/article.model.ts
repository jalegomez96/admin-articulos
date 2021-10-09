export class Article {
  constructor(
    public code: number | null = null,
    public description: string = '',
    public prize: number | null = null
  ) {}
  public isValid(): boolean {
    return !!this.code && !!this.description && !!this.prize;
  }
}
