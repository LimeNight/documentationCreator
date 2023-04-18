import { ref } from "vue"

export type Discription = {
    paragraph: string,
    position: number
}

export type SubMenuItem = {
    title:string,
    position: number,
    discriptions: Discription[]
}

export type MainMenuItem = {
    title:string,
    position: number,
    discriptions: Discription[],
    subMenuItems: SubMenuItem[]
}

export interface IDocumentation{
    id: number,
    userId: number,
    position: number,
    title: string,
    discriptions: Discription[]
    mainMenuItems?: MainMenuItem[]
}

export class Documentation implements IDocumentation{
    constructor(
        public id: number = 0,
        public userId: number = 0,
        public position: number = 0,
        public title: string = 'new',
        public discriptions: Discription[] = [],
        public mainMenuItems?: MainMenuItem[]
    ){}
}
export const calculatePosition = (array:  Documentation[] | MainMenuItem[] | SubMenuItem[] | Discription[]) => {
    let startPosition: number = 1;
    array.map(element => { element.position = startPosition++ })
    console.log(array)
}

export const selectedDocumentation = ref<IDocumentation | null>(null)
export const selectedDocumentaitonItem = ref<IDocumentation | MainMenuItem | SubMenuItem | null>(null)
export default {}