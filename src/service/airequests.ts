import { CreateCompletionRequest } from './openai';
import { ref } from 'vue';

//request types enum
export enum AiRequestType{
    Default = 'Select',
    Completion = 'Completion',
    Edit = 'Edit',
    Image = 'Image'
}

//request types reference
export const AiRequestTypeRef = ref(AiRequestType.Completion)

//chose a correct request
export class AiRequest{
    constructor(
        // public aiRequestType: AiRequestType,
        public prompt: string,
        // public instruction: string = 'Fix the spelling mistakes'
    )
    {}
    // make = () =>{
    //     switch (this.aiRequestType) {
    //         case AiRequestType.Completion:
    //             return CreateCompletionRequest(this.prompt)

    //         case AiRequestType.Edit:
    //             return CreateEditRequest(this.prompt, this.instruction)

    //         case AiRequestType.Image:
    //             return CreateImageRequest(this.prompt)

    //         default:
    //             return <string> "Válassz tipust mielött submitteled!"
    //     }
    // }

    make = (): Promise<string> => {
        return CreateCompletionRequest(this.prompt)
    }
}