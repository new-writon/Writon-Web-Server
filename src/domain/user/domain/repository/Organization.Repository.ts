import { Repository } from 'typeorm';
import { Organization } from '../entity/Organization';
import { Position } from '../entity/Position';

export interface OrganizationRepository extends Repository<Organization> {
  findOrganizationByName(name: string): Promise<Organization>;
  findAllOrganization(): Promise<Organization[]>;
  findPositionsByOrganizationId(organization: string): Promise<Position[]>;
}
