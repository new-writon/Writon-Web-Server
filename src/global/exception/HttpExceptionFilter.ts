import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

/**
 * @Catch(HttpException)
 * 해당 데코레이터는 필요한 메타 데이터를 ExceptionFilter에 바인딩하여,
 * 필터가 HttpException 타입의 예외만 찾고 있다는 것을 Nset.js에 알리기 위해 선언한다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @author Ryan
   * @description 예외 처리 함수
   *
   * @param exception 현재 처리 중인 예외 객체
   * @param host ArgumentsHost 객체 -> 핸들러에 전달되는 인수를 검색하는 메서드를 제공한다 (Express를 사용하는 경우 - Response & Request & Next 제공)
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @author Lee
     * @description HttpException에서 전송한 데이터를 추출할 때 사용
     */
    const res = exception.getResponse();

    response.status(status).json({
      code: status,
      message: res,
    });
  }
}
