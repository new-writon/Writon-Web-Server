import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Organization } from '../../entity/Organization';
import { OrganizationRepository } from '../Organization.Repository';
import { Position } from '../../entity/Position';

@Injectable()
export class OrganizationDao
  extends Repository<Organization>
  implements OrganizationRepository
{
  constructor(private dataSource: DataSource) {
    super(Organization, dataSource.createEntityManager());
  }

  async findOrganizationByName(name: string): Promise<Organization> {
    return this.findOne({
      where: {
        name,
      },
    });
  }

  async findAllOrganization(): Promise<Organization[]> {
    return this.createQueryBuilder()
      .select('o')
      .from(Organization, 'o')
      .getMany();
  }

  async findPositionsByOrganizationId(
    organization: string,
  ): Promise<Position[]> {
    return this.createQueryBuilder()
      .select('p')
      .from(Position, 'p')
      .innerJoin(Organization, 'o', 'o.organization_id = p.organization_id')
      .where('o.name = :organization', { organization })
      .getMany();
  }
}
