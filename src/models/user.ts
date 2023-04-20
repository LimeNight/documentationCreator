import type { IDocumentation } from "./documentation"
import { ref } from "vue"

export interface ILoginForm{
        email?: string,
        password?: string
}

export interface IRegister extends ILoginForm{
        username?: string
}

export interface IUser extends IRegister{
        id?: number,
        authenticate: boolean
}

export class User implements IUser{
        constructor(
                public id : number = 0,
                public username: string = '',
                public email: string = '',
                public password: string = '',
                public documentations: IDocumentation[] = [],
                public authenticate: boolean = false
        ){}
}

export const user = ref<User>(new User())