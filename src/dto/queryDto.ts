export class QueryDto {

  skip!: number;
  limit!: number;

  constructor(skip: number, limit: number) {
    this.skip = skip;
    this.limit = limit;
  }
}
