import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import axios from "axios";
import { apiGatewayResponseServiceWithCors as responseService } from "@/services/gateway/apiGatewayResponseService";

const url = process.env.INTERNAL_API_URL!;
const allowedIps = process.env.ALLOWED_IPS!;

export const proxyLambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info(`Request to: ${event.path} httpMethod: ${event.httpMethod} body: ${event.body}`);

  const requestingIp = event.requestContext.identity.sourceIp;

  console.info(`Requesting IP: ${requestingIp}`);
  console.info(`Allowed IPs: ${allowedIps}`);

  console.info(`Event: ${JSON.stringify(event)}`);

  if (!allowedIps.split(",").includes(requestingIp)) {
    console.warn(`Unauthorized IP: ${requestingIp}`);
    return responseService.createUnauthorizedResponse({ message: "Forbidden." });
  }

  try {
    const response = await axios.post(url + "/login");

    if (response.status !== 200) {
      return responseService.createBadRequestResponse({ message: "Bad request." });
    }

    return responseService.createSuccessResponse(response.data);
  } catch (err) {
    console.error(`Error creating success response: ${err}`);
    return responseService.createErrorResponse({ message: "Internal server error." });
  }
};
