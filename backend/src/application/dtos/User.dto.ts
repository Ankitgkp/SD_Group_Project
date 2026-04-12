import type {Multer} from 'multer';

export interface RegisterUserdto {
    firstName: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    govtId: Express.Multer.File;
    password: string;
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    govtId?: string;
}