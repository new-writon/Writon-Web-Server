import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { Organization } from './Organization';

@Entity('positions')
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'position_id' })
  positionId: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('int', { name: 'organization_id' })
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.affiliations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'organization_id', referencedColumnName: 'organizationId' }])
  organization: Relation<Organization>;

  public getName() {
    return this.name;
  }
}
