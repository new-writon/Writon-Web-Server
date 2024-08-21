import { Affiliation } from "../../domain/entity/Affiliation";
import { User } from "../../domain/entity/User";


export interface UserAffiliationOrganization{
    affiliation: Affiliation;
    user:User;
    organization: OrientationType;
}