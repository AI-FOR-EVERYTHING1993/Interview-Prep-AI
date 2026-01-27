import { 
  BedrockRuntimeClient,
  S3Client,
  DynamoDBClient,
  LambdaClient,
  CognitoIdentityProviderClient,
  SESClient,
  SNSClient,
  SQSClient,
  CloudWatchLogsClient,
  SecretsManagerClient,
  RekognitionClient,
  TextractClient,
  ComprehendClient,
  TranslateClient,
  PollyClient,
  TranscribeClient,
  LexRuntimeV2Client,
  SFNClient,
  EventBridgeClient,
  KinesisClient,
  OpenSearchClient
} from '@aws-sdk/client-*';

const awsConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    ...(process.env.AWS_SESSION_TOKEN && { sessionToken: process.env.AWS_SESSION_TOKEN })
  }
};

// Initialize all AWS clients
export const bedrockClient = new BedrockRuntimeClient(awsConfig);
export const s3Client = new S3Client(awsConfig);
export const dynamoClient = new DynamoDBClient(awsConfig);
export const lambdaClient = new LambdaClient(awsConfig);
export const cognitoClient = new CognitoIdentityProviderClient(awsConfig);
export const sesClient = new SESClient(awsConfig);
export const snsClient = new SNSClient(awsConfig);
export const sqsClient = new SQSClient(awsConfig);
export const cloudWatchClient = new CloudWatchLogsClient(awsConfig);
export const secretsClient = new SecretsManagerClient(awsConfig);
export const rekognitionClient = new RekognitionClient(awsConfig);
export const textractClient = new TextractClient(awsConfig);
export const comprehendClient = new ComprehendClient(awsConfig);
export const translateClient = new TranslateClient(awsConfig);
export const pollyClient = new PollyClient(awsConfig);
export const transcribeClient = new TranscribeClient(awsConfig);
export const lexClient = new LexRuntimeV2Client(awsConfig);
export const stepFunctionsClient = new SFNClient(awsConfig);
export const eventBridgeClient = new EventBridgeClient(awsConfig);
export const kinesisClient = new KinesisClient(awsConfig);
export const openSearchClient = new OpenSearchClient(awsConfig);