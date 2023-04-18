import axios from "axios";
import type { IDocumentation } from "./documentation";
import { getToken } from "@/utilities/storage";

export const config = () => {return { headers: { Authorization: `Bearer ${getToken()}` } }}

interface IDocumentReq{
    create(newDocumentation: IDocumentation): Promise<string>,
    read(userId: number): Promise<IDocumentation[]>,
    update(documentation: IDocumentation): Promise<string>,
    delete(documentationId: number): Promise<string>
}

class DocumentReq implements IDocumentReq{
    private url: string = 'http://localhost:3000/documentations/'
    constructor(){}

    create = async (newDocumentation: IDocumentation): Promise<string> => {
        return await axios.post(this.url, newDocumentation, config())
        .then(() => { return "success create new documentation" })
        .catch(() => { return "failed to create new documentation" })
    }

    read = async (userId: number): Promise<IDocumentation[]> => {
        const { headers } = config()
        let documentations: IDocumentation[] = []
        await axios(this.url, { params: { userId: userId }, headers })
        .then(res => { documentations = res.data.map((doc: IDocumentation) => doc) })
        .catch(err => { console.log(err) })
        return documentations
    }

    update = async (documentation: IDocumentation): Promise<string> => {
        return await axios.put(this.url + documentation.id, documentation, config())
            .then(() => { return "update success" })
            .catch(() => { return "update failed" });
    }

    delete = async (documentationId: number): Promise<string> => {
        return await axios.delete(this.url + documentationId, config())
        .then(() => { return "delete success" })
        .catch(() => { return "delete failed" });
    }
}

export const docRequest = new DocumentReq()

export default {}