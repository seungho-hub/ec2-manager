import type { Instance } from '@aws-sdk/client-ec2';
import {
	EC2Client,
	DescribeInstancesCommand,
	StartInstancesCommand,
	StopInstancesCommand,
	RebootInstancesCommand
} from '@aws-sdk/client-ec2';
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

	async startInstance(id: string) {
		const command = new StartInstancesCommand({
			InstanceIds: [id]
		});

		const res = await this.client.send(command);

		return res;
	}

	async stopInstance(id: string) {
		const command = new StopInstancesCommand({
			InstanceIds: [id]
		});

		const res = await this.client.send(command);

		return res;
	}

	async rebootInstance(id: string) {
		const command = new RebootInstancesCommand({
			InstanceIds: [id]
		});

		const res = await this.client.send(command);

		return res;
	}
}

const ec2operation = new EC2Operation();

export default ec2operation;
