export class NotFoundException extends Error {
  constructor() {
    super('Person with the given email not found');
  }
}
