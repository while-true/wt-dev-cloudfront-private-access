import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import JWTService from "@/services/jwt/JWTService";
import { apiGatewayResponseServiceWithCors as responseService } from "@/services/gateway/apiGatewayResponseService";

export const internalNetworkAuthHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.info(`Request to: ${event.path} httpMethod: ${event.httpMethod} body: ${event.body}`);

  try {
    // Create JWT token and return it in the response
    const token = await JWTService.generateJWTToken({
      email: "admin@wt.dev",
    });

    return responseService.createSuccessResponse({ token });
  } catch (err) {
    console.error(`Error creating success response: ${err}`);
    return responseService.createErrorResponse({ message: "Internal server error." });
  }
};
