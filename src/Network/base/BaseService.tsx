import { NorthwindApiInstance} from "../core/NorthwindApiInstance";
import { ResponseModel } from "../../Models/core/ResponseModel";


export class BaseService <T>{
    private endpointUrl:string =""
    constructor(url:string){
        this.endpointUrl=url
    }

   async getAll(url:string=this.endpointUrl):Promise<ResponseModel>{
    try {

        let apiResponse = await NorthwindApiInstance.get(url);

        let response: ResponseModel = {
            data: apiResponse.data,
            status: true,
            statusCode: apiResponse.status,
            errorMessage: ''
        }
        return response;
    } catch (error:any) {

        let response: ResponseModel = {
            data: {},
            status: false,
            statusCode: error.response.status,
            errorMessage: error.message
        }

        return response;
    }

    }

    async add(data: T, url: string = this.endpointUrl): Promise<ResponseModel> {

        try {
            let apiResponse = await NorthwindApiInstance.post(url, data);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;

        } catch (error :any) {
            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }
    async delete(url: string = this.endpointUrl): Promise<ResponseModel> {

        try {
            let apiResponse = await NorthwindApiInstance.delete(url);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;

        } catch (error :any) {
            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }
}