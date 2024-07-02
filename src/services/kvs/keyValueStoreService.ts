import {
  GetKeyCommand,
  ResourceNotFoundException,
  CloudFrontKeyValueStoreClient,
} from "@aws-sdk/client-cloudfront-keyvaluestore";

import "@aws-sdk/signature-v4-crt";

const KVS_ARN = process.env.KVS_ARN;

interface KeyValueStoreService {
  getKey(key: string): Promise<string | undefined>;
}

class KeyValueStoreServiceImpl implements KeyValueStoreService {
  private client: CloudFrontKeyValueStoreClient;

  constructor() {
    this.client = new CloudFrontKeyValueStoreClient();
  }

  async getKey(key: string): Promise<string | undefined> {
    const command = new GetKeyCommand({
      KvsARN: KVS_ARN,
      Key: key,
    });

    try {
      const response = await this.client.send(command);
      return response.Value;
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        return undefined;
      }
      throw error;
    }
  }
}

export default new KeyValueStoreServiceImpl();
