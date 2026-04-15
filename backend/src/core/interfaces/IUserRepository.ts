import { UserEntity } from '../entities/User.entity.js';
import type { RegisterUserdto, UpdateUserdto } from '../../application/dtos/User.dto.js';

export interface IUserRepository {
    findById(id: string): Promise<UserEntity | null>;
    delete(id: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[] | null[]>;
    create(data: Omit<RegisterUserdto, "govt_id"> & { govt_id: string, refreshToken: string }): Promise<UserEntity>;
    update(id: string, data: Omit<UpdateUserdto, "govt_id"> | { govt_id: string }): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findByPhone(phoneNumber: string): Promise<UserEntity | null>;
    findAuthByEmail(email: string): Promise<{ user: UserEntity; hashedPassword: string; } | null>;
    findAuthByPhone(phoneNumber: string): Promise<{ user: UserEntity; hashedPassword: string; } | null>;
    getRefreshTokenById(id: string): Promise<string | null>;
}