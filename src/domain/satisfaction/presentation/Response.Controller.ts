import { Controller } from "@nestjs/common";
import { ResponseService } from "../service/Response.Service.js";


@Controller()
export class ResponseController{
    
    constructor(
        private readonly responseService: ResponseService
    ){}
}