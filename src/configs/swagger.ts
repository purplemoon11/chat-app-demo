import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import env from "./env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat Application",
      description: "This API is for Chat Application.",
      version: "1.0.0",
    },
    servers: [
      {
        url: env.swaggerDev,
        description: "Test",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
function setupSwagger(app: any) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
export default setupSwagger;
