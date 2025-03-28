import { InsertUserTemplateContent } from '../../dto/values/InsertUserTemplateContent';
import { WriteTemplateContent } from '../../dto/values/TemplateContent';

export abstract class TemplateWriter {
  protected changeUserTemplateType(
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
