import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();
  
  public initializeOptions() {
    return this.builder
    	.setTitle('Swagger Writon')
    	.setDescription('Swagger Writon API description')
    	.setVersion('1.0.0')
    	.addTag('swagger')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }, 'access-token')
    	.build();
  }
}