"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WeIDY')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('regov')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8888;
    await app.listen(PORT);
    console.log('RUNNING ON PORT: ' + process.env.PORT);
    console.log('You are ' + process.env.ACTOR + '!');
}
bootstrap();
//# sourceMappingURL=main.js.map