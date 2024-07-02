import jwt, { Jwt } from "jsonwebtoken";
import keyValueStoreService from "@/services/kvs/keyValueStoreService";

export interface JWTService {
  generateJWTToken(payload: Record<string, string>): Promise<string>;
  validateJWTToken(token: string): Promise<Jwt>;
}

class JWTServiceImpl implements JWTService {
  private async getSecretKey(): Promise<string> {
    const secretKey = await keyValueStoreService.getKey("JWT_SECRET_KEY");
    if (!secretKey) {
      throw new Error("JWT secret key not found.");
    }
    return secretKey;
  }

  async generateJWTToken(payload: Record<string, string>): Promise<string> {
    const secretKey = await this.getSecretKey();
    return jwt.sign(payload, secretKey, {
      expiresIn: "1h",
      notBefore: "-60s",
    });
  }

  async validateJWTToken(token: string): Promise<Jwt> {
    const secretKey = await this.getSecretKey();
    return jwt.verify(token, secretKey, { complete: true }) as Jwt;
  }
}

export default new JWTServiceImpl();
