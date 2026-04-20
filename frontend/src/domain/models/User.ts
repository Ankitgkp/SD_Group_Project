export class User {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phoneNumber: string;
  public readonly address: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null,
    address: string | null
  ) {
    this.id = id;
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.phoneNumber = phoneNumber ?? "";
    this.address = address ?? "";
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  hasEmail(): boolean {
    return this.email.length > 0;
  }

  hasPhone(): boolean {
    return this.phoneNumber.length > 0;
  }

  hasAddress(): boolean {
    return this.address.length > 0;
  }
}