import { TemplateContent } from "../dto/response/TemplateContent.js";

export const sortCompanyPublic = (data: TemplateContent[]): TemplateContent[] => {
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


