import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/error/AppError.js";
import { UserRepository } from "../../infrastructure/repositories/User.repository.js";
import type { RegisterUserdto } from "../dtos/User.dto.js";
import type { IUserRepository } from "../../core/interfaces/IUserRepository.js";
import { RepositoryFactory } from "../../infrastructure/factories/Repository.factory.js";
import { CloudinaryService } from "../../shared/utils/cloudinary.util.js";
import { config } from "../../config/env.config.js";
import type { UserEntity } from "../../core/entities/User.entity.js";

export class AuthService {
  private userRepository: IUserRepository;
  private cloudinaryService: CloudinaryService;
  private readonly SALT_ROUNDS = 10;

  constructor() {
    this.userRepository =
      RepositoryFactory.getUserRepository() as IUserRepository;
    this.cloudinaryService = new CloudinaryService();
  }

  async register(
    registerUserDto: RegisterUserdto,
  ): Promise<{user: UserEntity, tokens: { accessToken: string, refreshToken: string }}> {
    console.log("Starting registration process");
    if (registerUserDto.email) {
      const emailExists = await this.userRepository.findByEmail(
        registerUserDto.email,
      );
      if (emailExists) {
        throw new AppError("Email already in use", 400);
      }
    }

    if (registerUserDto.phoneNumber) {
      const phoneExists = await this.userRepository.findByPhone(
        registerUserDto.phoneNumber,
      );
      if (phoneExists) {
        throw new AppError("Phone number already in use", 400);
      }
    }

    const govtIdURL = await this.cloudinaryService.uploadToCloudinary(
      registerUserDto.govtId.path,
      "govtId"
    );

    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      this.SALT_ROUNDS,
    );

    const newUser = await this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
        govtId: govtIdURL.secure_url,
    })

    const tokens = this.generateTokens(Number(newUser.id));

    return {user: newUser, tokens};
  }

  private generateTokens(userId: number): { accessToken: string, refreshToken: string } {
    const accessToken = jwt.sign({ userId }, this.getJwtSecret(), { expiresIn: config.jwt.accessTokenExpiry as any });
    const refreshToken = jwt.sign({ userId }, this.getJwtSecret(), { expiresIn: config.jwt.refreshTokenExpiry as any });
    return { accessToken, refreshToken };
  }

  private getJwtSecret(): string {
  const secret = config.jwt.secret;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
}
}
