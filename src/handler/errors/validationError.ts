export class ValidationError extends Error {
  constructor(public validationErrors: { field: string, errors: string[] }[]) {
    const errorMessage = validationErrors.map(e => `${e.field}: ${e.errors}`).join('\n');
    super(errorMessage);
    this.name = "ValidationError";
  }
}