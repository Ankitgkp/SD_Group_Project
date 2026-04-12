import { UserEntity } from '../entities/User.entity.js';
import type { RegisterUserdto, UpdateUserDto } from '../../application/dtos/User.dto.js';

export interface IUserRepository {
    findById(id: string): Promise<UserEntity | null>;
    delete(id: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[] | null[]>;
    create(data: Omit<RegisterUserdto, "govtId"> & { govtId: string }): Promise<UserEntity>;
    update(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findByPhone(phoneNumber: string): Promise<UserEntity | null>;
}