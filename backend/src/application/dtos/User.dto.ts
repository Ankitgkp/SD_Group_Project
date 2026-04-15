import type {Multer} from 'multer';

export interface RegisterUserdto {
    first_name: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    govt_id: Express.Multer.File;
    password: string;
}

export interface LoginUserdto {
    email?: string;
    phone_number?: string;
    password: string;
}

export interface UpdateUserdto {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    govt_id?: Express.Multer.File;
    password?: string;
    refreshToken?: string;
}