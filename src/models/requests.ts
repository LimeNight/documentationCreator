import axios, { type AxiosRequestConfig } from "axios";
import type { IDocumentation } from "./documentation";
import { getToken } from "@/utilities/storage";

const token: string = getToken()
export const config: AxiosRequestConfig  = { headers: { Authorization: `Bearer ${token}` } }

interface IDocumentReq{
    create(newDocumentation: IDocumentation): Promise<IDocumentation>,
    read(userId: number): Promise<IDocumentation[]>,
    update(documentation:  IDocumentation | IDocumentation[]): Promise<void>,
    delete(documentationId: number): Promise<string>
}

class DocumentReq implements IDocumentReq{
    private url: string = 'http://localhost:3000/documentations/'
    constructor(){}

    create = async (newDocumentation: IDocumentation): Promise<IDocumentation> => {
        return await axios.post(this.url, newDocumentation, config)
        .then(res => { return res.data})
        .catch(() => { return "Something went wrong!"});
    }

    read = async (userId: number): Promise<IDocumentation[]> => {
        const { headers } = config
        let documentations: IDocumentation[] = []
        await axios(this.url, { params: { userId: userId }, headers })
        .then(res => { documentations = res.data.map((document: IDocumentation) => document)})
        .catch(err => { console.log(err) })
        return documentations.sort((p1, p2) => (p1.position > p2.position) ? 1 : (p1.position < p2.position) ? -1 : 0);
    }

    update = async (documentation: IDocumentation | IDocumentation[] | null): Promise<void> => {
        if (documentation !== null){
            if (!Array.isArray(documentation)){
                return await axios.put(this.url + documentation.id, documentation, config)
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log(err));
            }else{
                const requests = documentation.map((document: IDocumentation) =>{
                    axios.put(this.url + document.id, document, config)
                })
        
                axios.all(requests)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }
        }else{
            console.log("Documentation is null!")
        }
    }

    delete = async (documentationId: number): Promise<string> => {
        return await axios.delete(this.url + documentationId, config)
        .then(() => { return "delete success" })
        .catch(() => { return "delete failed" });
    }
}

export const docRequest = new DocumentReq()