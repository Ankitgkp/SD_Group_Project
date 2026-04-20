import { User } from "../models/User";

type RawUser = {
  id?: string;
  user_id?: string;

  firstName?: string;
  first_name?: string;

  lastName?: string | null;
  last_name?: string | null;

  email?: string | null;

  phoneNumber?: string | null;
  phone_number?: string | null;

  address?: string | null;
};

export class UserFactory {
  static create(raw: RawUser): User {
    return new User(
      raw.id ?? raw.user_id ?? "",

      raw.firstName ?? raw.first_name ?? "",
      raw.lastName ?? raw.last_name ?? "",

      raw.email ?? "",

      raw.phoneNumber ?? raw.phone_number ?? "",

      raw.address ?? ""
    );
  }
}