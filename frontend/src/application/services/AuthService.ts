import { apiClient } from "../../core/api/apiClient";
import { UserFactory } from "../../domain/factories/UserFactory";
import { User } from "../../domain/models/User";

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export class AuthService {
  async register(formData: FormData): Promise<User> {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/register",
      formData
    );

    return UserFactory.create(response.data);
  }

  async login(formData: FormData): Promise<User> {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/login",
      formData
    );

    return UserFactory.create(response.data);
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<any>>("/auth/me");
    return UserFactory.create(response.data);
  }
}