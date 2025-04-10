import { Injectable } from '@nestjs/common';
import { ChallengeUseCase } from '../../port/input/ChallengeUseCase';
import { ChallengeOperation } from '../types/Operation';
import { UserApi } from '../../apis/User.Api';
import { DataMapperService } from 'src/domain/challenge/domain/service/DataMapper.Service';
import { ChallengeHelper } from '../../helper/Challenge.Helper';
import { ChallengeAccordingToOrganization } from 'src/domain/challenge/dto/response/ChallengeAccordingToOrganization';
import { ChallengeAndOrganization } from 'src/domain/challenge/dto/values/ChallengeAndOrganization';
import { Organization } from 'src/domain/user/domain/entity/Organization';
import { Challenge } from 'src/domain/challenge/domain/entity/Challenge';

@Injectable()
export class AllChallengeCollector
  implements ChallengeUseCase<void, Promise<ChallengeAccordingToOrganization[]>>
{
  operation: ChallengeOperation = 'SELECT_ALL_CHALLENGE';
  constructor(
    private readonly userApi: UserApi,
    private readonly dataMapperService: DataMapperService,
    private readonly challengeHelper: ChallengeHelper,
  ) {}
  async handle(request: void): Promise<ChallengeAccordingToOrganization[]> {
    const organizationDatas = await this.userApi.requestAllOrganization();
    const extractedOrganizationIds =
      this.dataMapperService.extractOrganizationIds(organizationDatas);
    const challengeDatas =
      await this.challengeHelper.giveChallengeByOrgnizationIds(extractedOrganizationIds);
    const mappedChallengeAndOrganization = this.mappingChallengeAndOrganization(
      organizationDatas,
      challengeDatas,
    );
    const sortedallChallengeAccordingToOrganizationData = this.sortChallengePerOrganization(
      mappedChallengeAndOrganization,
    );
    return ChallengeAccordingToOrganization.of(sortedallChallengeAccordingToOrganizationData);
  }

  public mappingChallengeAndOrganization(
    organizations: Organization[],
    challenges: Challenge[],
  ): ChallengeAndOrganization[] {
    return organizations.flatMap((organization) => {
      const relatedChallenges = challenges.filter(
        (challenge) => challenge.getOrganizationId() === organization.getId(),
      );
      return relatedChallenges.map((data) => {
        return new ChallengeAndOrganization(organization.getName(), data.getName());
      });
    });
  }

  private sortChallengePerOrganization(
    array: ChallengeAndOrganization[],
  ): ChallengeAccordingToOrganization[] {
    const groupOrganization: {
      [organization: string]: string[];
    } = {};
    array.forEach((item) => {
      if (!groupOrganization[item.getOrganization()]) {
        groupOrganization[item.getOrganization()] = [];
      }
      groupOrganization[item.getOrganization()].push(item.getChallenge());
    });
    const sortData: ChallengeAccordingToOrganization[] = Object.entries(groupOrganization).map(
      ([organization, challenges]) => {
        return new ChallengeAccordingToOrganization(organization, challenges);
      },
    );
    return sortData;
  }
}
