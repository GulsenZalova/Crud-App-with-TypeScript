import { BaseService } from "../base/BaseService";
import { ProductsModel } from "../../Models/ProductsModel";

export class ProductsService extends BaseService<ProductsModel>{
        constructor(){
            super("/products")
        }
}



