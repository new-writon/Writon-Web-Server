import { TemplateContent } from "../dto/response/TemplateContent.js";

export const sortCompanyPublic = (data: TemplateContent[]): TemplateContent[] => {
    return data.map((item) => {
        if (item.getCompanyPublic() === false) {
            item.changeCompany(null);
        }
        return item;
    });
}


