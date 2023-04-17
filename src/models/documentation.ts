export type Discription = {
    paragraph: string
}

export type SubMenuItem = {
    title:string,
    position: number,
    discription: Discription[]
}

export type MainMenuItem = {
    title:string,
    position: number,
    discription: Discription[],
    subMenuItems?: SubMenuItem[]
}

export interface IDocumentation{
    id: number,
    userId: number,
    position: number,
    title: string,
    mainMenuItems: MainMenuItem[]
}

export class Documentation implements IDocumentation{
    constructor(
        public id: number = 0,
        public userId: number = 0,
        public position: number = 0,
        public title: string = 'new',
        public mainMenuItems: MainMenuItem[] = [{title: 'new', position: 0, discription: [], subMenuItems: []}]
    ){}
}

export default { Documentation }