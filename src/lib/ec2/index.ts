import type { Instance } from '@aws-sdk/client-ec2';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { ec2ClientConfig } from '../../conf/ec2Client.config';

class EC2Operation {
	private client: EC2Client;

	constructor() {
		this.client = new EC2Client(ec2ClientConfig);
	}

	async getinstances() {
		const instances: Instance[] = [];
		const command = new DescribeInstancesCommand({});

		const res = await this.client.send(command);

		res.Reservations?.forEach((reservation) => {
			reservation.Instances?.forEach((instance) => {
				instances.push(instance);
			});
		});

		return instances;
	}
}

const ec2operation = new EC2Operation();

export default ec2operation;
