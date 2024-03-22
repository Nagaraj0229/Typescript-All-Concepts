/* eslint-disable no-undef */
const Environments = Object.freeze({
  accessKey: process.env.ACCESS_KEY || '',
  secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
  region: process.env.REGION || '',
  queueUrl: process.env.QUEUE_URL || '',
  serviceName: process.env.SERVICE_NAME || '',
  enableLogger: process.env.ENABLE_LOGGER || '',
  lambdaUri: process.env.LAMBDA_URI || '',
  googleCalenderAuthUrl: 'https://oauth2.googleapis.com/token',
  googleCalendarBaseUrl: 'https://www.googleapis.com/calendar/v3',
  websiteBaseEndPoint: 'https://webhook.hermetic.ai',
  calendlyAuthUrl: 'https://auth.calendly.com/oauth/token',
  calendlyBaseUrl: 'https://api.calendly.com',
  stage: process.env.STAGE,
  smsHistoryTable: process.env.SMS_HISTORY_TABLE,
  subscriptionsTable: process.env.USER_SUBSCRIPTION_TABLE,
  schedulerRoleArn: process.env.EVENT_BRIDGE_ROLE_ARN,
  schedulerTargetArn: process.env.TARGET_ARN,
  webhookBaseUrl: process.env.WEBHOOK_BASE_URL,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
