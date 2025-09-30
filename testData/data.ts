import { env } from "process";

type FooterElements = string[];
type LeftMenuElements = string[];
type RightMenuElements = string[];

export type RegisterData = {
    firstName: string[],
    lastName: string[],
    street: string[],
    city: string[],
    state: string[],
    zipCode: string[],
    phoneNumber: string[],
    ssn: string[],
    username: string[],
    password: string[],
    repeatedPassword: string[],
}

export type LoginData = {
    username: string[],
    password: string[],
}

export const footerElements: FooterElements = [
    'Home',
    'About Us',
    'Services',
    'Products',
    'Locations',
    'Forum',
    'Site Map',
    'Contact Us'
];

export const leftMenuElements: LeftMenuElements = [
    'Solutions',
    'About Us',
    'Services',
    'Products',
    'Locations',
    'Admin Page',
];

export const rightMenuElements: RightMenuElements = [
    'home',
    'about',
    'contact',
];

export const loginInputName: string[] = ['username', 'password'];

export const registerData: RegisterData = {
    firstName: ['customer.firstName', 'Sample123'],
    lastName: ['customer.lastName', 'User'],
    street: ['customer.address.street', 'ABC street'],
    city: ['customer.address.city', 'Kochi'],
    state: ['customer.address.state', 'Kerala'],
    zipCode: ['customer.address.zipCode', '666888'],
    phoneNumber: ['customer.phoneNumber', '8989898989'],
    ssn: ['customer.ssn', '123456'],
    username: ['customer.username', `${process.env.registerUsername}`],
    password: ['customer.password', `${process.env.registerPassword}`],
    repeatedPassword: ['repeatedPassword', `${process.env.registerConfirmPassword}`],
}

export const loginData: LoginData = {
    username: ['username', `${process.env.loginUsername}`],
    password: ['password', `${process.env.loginPassword}`],
}

export const copyrightText: string = "© Parasoft. All rights reserved.";

