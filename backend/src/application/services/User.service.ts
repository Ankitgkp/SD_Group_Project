import { AppError } from "../../shared/error/AppError.js";
import type { RegisterUserdto, LoginUserdto, UpdateUserdto } from "../dtos/User.dto.js";
import type { IUserRepository } from "../../core/interfaces/IUserRepository.js";
import { RepositoryFactory } from "../../infrastructure/factories/Repository.factory.js";
import { CloudinaryService } from "../../shared/utils/cloudinary.util.js";
import { config } from "../../config/env.config.js";
import type { UserEntity } from "../../core/entities/User.entity.js";

export class UserService {
    private userRepository: IUserRepository;
    private cloudinaryService: CloudinaryService;

    constructor() {
        this.userRepository =
      RepositoryFactory.getUserRepository() as IUserRepository;
    this.cloudinaryService = new CloudinaryService();
    }

    async updateProfile(user: UserEntity, updateUserDto: Omit<UpdateUserdto, "password" | "govtId" | "refreshToken">): Promise<UserEntity | null> {
      const updatedUser = await this.userRepository.update(String(user.user_id), updateUserDto);
      return updatedUser;
  }

    async updateGovtId(user: UserEntity, govt_id: Express.Multer.File): Promise<UserEntity | null> {
      const govtIdURL = await this.cloudinaryService.uploadToCloudinary(
        govt_id.path,
        "govt_id",
      );

      const updatedUser = await this.userRepository.update(String(user.user_id), { govt_id: govtIdURL.secure_url });

      await this.cloudinaryService.deleteFromCloudinary(user.govt_id);
      return updatedUser;
    }
    
}