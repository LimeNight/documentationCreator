import { ref, reactive } from "vue"
import { docRequest } from "./requests"
import { user } from "./user"

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
    mainMenuItems: MainMenuItem[]
}

export class Documentation implements IDocumentation{
    constructor(
        public id: number = 0,
        public userId: number = 0,
        public position: number = 0,
        public title: string = 'new',
        public discriptions: Discription[] = [],
        public mainMenuItems: MainMenuItem[] = []
    ){}
}
export const selectedDocumentation = ref<IDocumentation | null>(null)
export const selectedDocumentationItem = ref<IDocumentation | MainMenuItem | SubMenuItem | null>(null)

export const calculatePosition = (array:  Documentation[] | MainMenuItem[] | SubMenuItem[] | Discription[]) => {
    let startPosition: number = 1;
    array.map(element => { element.position = startPosition++ })
}

export let newDiscription = reactive<Discription>({
    position: 1,
    paragraph: ''
})

export let newSubMenu = reactive<SubMenuItem>({
    title: 'newest',
    position: 1,
    discriptions: []
})

export let newMainMenu = reactive<MainMenuItem>({
    title: 'new',
    position: 1,
    discriptions: [],
    subMenuItems: []
})

export let newDocumentation = reactive<Documentation>(new Documentation())

export const addParahraph = async (documentation: IDocumentation, selectedItem: IDocumentation | MainMenuItem | SubMenuItem | null , position: number): Promise<void> => {
    if(selectedItem){
        selectedItem.discriptions?.splice(position, 0, Object.assign({}, newDiscription))
        calculatePosition(selectedItem.discriptions)
        docRequest.update(documentation)
    }
}

export const addSub = async (documentation: IDocumentation, mainMenu: MainMenuItem, position: number = 1): Promise<void> => {
    mainMenu.subMenuItems.splice(position, 0, Object.assign({}, newSubMenu))
    calculatePosition(mainMenu.subMenuItems)
    docRequest.update(documentation)
}

export const addMain = async (documentation: IDocumentation, position: number = 1): Promise<void> => {
    documentation.mainMenuItems.splice(position, 0, Object.assign({}, newMainMenu))
    if (documentation.mainMenuItems) calculatePosition(documentation.mainMenuItems)
    docRequest.update(documentation)
}

export const addNewDocumentation = async (newDocumentation: IDocumentation, position: number = 1 ): Promise<void> => {
    newDocumentation.userId = user.value.id
    user.value.documentations.splice(position, 0, Object.assign({}, newDocumentation))
    calculatePosition(<Documentation[]>user.value.documentations)
    const savedDocumentation = await docRequest.create(newDocumentation)
    const doc = user.value.documentations.find(({ id }) => id === 0)
    if (doc) doc.id = savedDocumentation.id
}

export const deleteParagraph = (documentation: IDocumentation, selectedItem: IDocumentation | MainMenuItem | SubMenuItem | null , position: number) => {
    if (selectedItem){
        selectedItem?.discriptions.splice(position - 1, 1)
        if (selectedItem.discriptions.length != 0) calculatePosition(selectedItem?.discriptions)
        docRequest.update(documentation)
    }
}

export const deleteSub = async (documentation: IDocumentation, mainMenu: MainMenuItem, position: number): Promise<void> => {
    let sure = window.confirm('Are you sure you want to delete it?')
    if(sure){
        mainMenu.subMenuItems.splice(position - 1, 1)
        calculatePosition(mainMenu.subMenuItems)
        docRequest.update(documentation)
    }
}

export const deleteMain = async (documentation: IDocumentation, position: number): Promise<void> => {
    let sure = window.confirm('Are you sure you want to delete it?')
    if(sure){
    documentation.mainMenuItems.splice(position - 1, 1)
    calculatePosition(documentation.mainMenuItems)
    docRequest.update(documentation)
    }
}

export const deleteDoc = async (id:number, position: number): Promise<void> => {
    let sure = window.confirm('Are you sure you want to delete it?')
    if(sure){
        user.value.documentations.splice(position - 1, 1)
        calculatePosition(user.value.documentations)
        docRequest.delete(id)
    }
}