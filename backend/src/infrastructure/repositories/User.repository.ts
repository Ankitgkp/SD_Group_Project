import type { IUserRepository } from "../../core/interfaces/IUserRepository.js";
import type { User } from "@prisma/client";
import DatabaseClient from "../database/prisma.client.js";
import { UserEntity } from "../../core/entities/User.entity.js";
import type {
  RegisterUserdto,
  UpdateUserDto,
} from "../../application/dtos/User.dto.js";

export class UserRepository implements IUserRepository {
  private prisma = DatabaseClient.getInstance();

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
    if (user) {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.delete({
      where: {
        user_id: id,
      },
    });
    if (user) {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      return null;
    }
  }

  async findAll(): Promise<UserEntity[] | null[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    });
  }

  async create(data: Omit<RegisterUserdto, "govtId"> & { govtId: string }): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        user_id: crypto.randomUUID(),
        first_name: data.firstName,
        last_name: data.lastName ?? null,
        email: data.email ?? null,
        password: data.password,
        phone_number: data.phoneNumber ?? null,
        address: data.address ?? null,
        govt_id: data.govtId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return new UserEntity(
      user.user_id,
      user.first_name,
      user?.last_name,
      user?.email,
      user?.phone_number,
      user?.address,
      user.govt_id,
      user.createdAt,
      user.updatedAt,
    );
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    const user = await this.prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    if (user) {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      return null;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      return null;
    }
  }

  async findByPhone(phoneNumber: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });
    if (user) {
      return new UserEntity(
        user.user_id,
        user.first_name,
        user?.last_name,
        user?.email,
        user?.phone_number,
        user?.address,
        user.govt_id,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      return null;
    }
  }
}
