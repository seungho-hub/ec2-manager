import type { EC2ClientConfig } from '@aws-sdk/client-ec2';
import {
	PRIVATE_AWS_REGION,
	PRIVATE_AWS_ACCESS_KEY,
	PRIVATE_AWS_SECRET_ACCESS_KEY
} from '$env/static/private';

export const ec2ClientConfig: EC2ClientConfig = {
	region: PRIVATE_AWS_REGION,
	credentials: {
		accessKeyId: PRIVATE_AWS_ACCESS_KEY,
		secretAccessKey: PRIVATE_AWS_SECRET_ACCESS_KEY
	}
};

export const autoScalingClientConfig = {
	region: process.env.AWS_REGION
};
