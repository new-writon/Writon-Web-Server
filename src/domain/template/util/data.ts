import { CommentInformation } from "../dto/response/CommentInformation";
import { TemplateContent } from "../dto/response/TemplateContent";

export const sortCompanyPublic = (data: TemplateContent[] | CommentInformation[]): TemplateContent[] | CommentInformation[] => {
    return data.map((item) => {
        if (Number(item.getCompanyPublic()) === 0) {
            item.changeCompany(null);
        }
        return item;
    });
}

export const sortCompanyPublicArray = (datas: TemplateContent[][]): TemplateContent[][] => {
    return datas.map((items) => {
        return items.map((item) => {
            if (Number(item.getCompanyPublic())  === 0) {
                item.changeCompany(null);
            }
            return item;
        });   
    });
}


