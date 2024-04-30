import { Affiliation } from "../user/domain/entity/Affiliation";
import { User } from "../user/domain/entity/User";


export interface UserAffiliationOrganization{
    affiliation: Affiliation;
    user:User;
    organization: OrientationType;
}