import { Injectable } from '@nestjs/common';
import { QuestionContent } from 'src/domain/template/domain/entity/QuestionContent';
import { InsertUserTemplateContent } from 'src/domain/template/dto/values/InsertUserTemplateContent';
import { WriteTemplateContent } from 'src/domain/template/dto/values/TemplateContent';
import { DataSource } from 'typeorm';

@Injectable()
export class UserTemplateTransaction {
  constructor(private dataSource: DataSource) {}

  public async insertTemplateTransaction() // userChallnegeId: number,
  // date: Date,
  // complete: boolean,
  // templateContent: Array<WriteTemplateContent>,
  : Promise<void> {
    // const newUserTemplate = UserTemplate.createUserTemplate(userChallnegeId, date, complete);
    // await this.dataSource.transaction(async (transactionalEntityManager) => {
    //  const userTemplateData = await transactionalEntityManager.save(newUserTemplate)
    // const changedTemplate = this.changeUserTemplateType(templateContent, userTemplateData.getId());
    // const questionContents = changedTemplate.map(this.createQuestionContentObject);
    // await transactionalEntityManager.save(questionContents)
    //  });
  }

  public async updateTemplateTransaction(
    userTemplateId: number,
    templateContent: Array<WriteTemplateContent>,
  ) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(QuestionContent, { userTemplateId: userTemplateId });
      const changedTemplate = this.changeUserTemplateType(templateContent, userTemplateId);
      const questionContents = changedTemplate.map(this.createQuestionContentObject);
      await transactionalEntityManager.save(questionContents);
    });
  }

  private createQuestionContentObject(templateContent: InsertUserTemplateContent): QuestionContent {
    return QuestionContent.createQuestionContent(
      templateContent.getQuestionId(),
      templateContent.getContent(),
      templateContent.getVisibility(),
      templateContent.getUserTempleteId(),
    );
  }

  private changeUserTemplateType(
    writeTempletes: WriteTemplateContent[],
    userTempleteId: number,
  ): InsertUserTemplateContent[] {
    return writeTempletes.map((writeTemplete) =>
      InsertUserTemplateContent.of(
        writeTemplete.getQuestionId(),
        writeTemplete.getContent(),
        writeTemplete.getVisibility(),
        userTempleteId,
      ),
    );
  }
}
