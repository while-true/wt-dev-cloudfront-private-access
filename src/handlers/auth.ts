import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { validateLoginRequestBody } from "@/helpers/validators";
import JWTService from "@/services/jwt/JWTService";
import { LoginRequest } from "@/types/auth";
import { apiGatewayResponseServiceWithCors as responseService } from "@/services/gateway/apiGatewayResponseService";

export const authHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info(`Request to: ${event.path} httpMethod: ${event.httpMethod} body: ${event.body}`);

  try {
    let parsedBody: LoginRequest;

    if (!event.body) {
      return responseService.createBadRequestResponse({ message: "Request body is missing." });
    }

    try {
      parsedBody = JSON.parse(event.body) as LoginRequest;
      validateLoginRequestBody(parsedBody);
    } catch (err) {
      console.error(`Error validating request body: ${err}`);
      return responseService.createBadRequestResponse({ message: "Invalid request body." });
    }

    // Check if email and password are correct
    if (parsedBody.email !== "admin@wt.dev" || parsedBody.password !== "admin") {
      return responseService.createUnauthorizedResponse({ message: "Invalid email or password." });
    }

    // Create JWT token and return it in the response
    const token = await JWTService.generateJWTToken({
      email: parsedBody.email,
    });

    return responseService.createSuccessResponse({ token });
  } catch (err) {
    console.error(`Error creating success response: ${err}`);
    return responseService.createErrorResponse({ message: "Internal server error." });
  }
};
