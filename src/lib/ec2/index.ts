import type { Instance, RunInstancesCommandInput } from '@aws-sdk/client-ec2';
import {
	EC2Client,
	DescribeInstancesCommand,
	StartInstancesCommand,
	StopInstancesCommand,
	RebootInstancesCommand,
	DescribeAvailabilityZonesCommand,
	DescribeRegionsCommand,
	DescribeImagesCommand,
	DescribeSecurityGroupsCommand,
	RunInstancesCommand,
	DescribeKeyPairsCommand,
	TerminateInstancesCommand
} from '@aws-sdk/client-ec2';
import { ec2ClientConfig } from '../../conf/ec2Client.config';
import { NodeSSH, type Config } from 'node-ssh';

class EC2Operation {
	private client: EC2Client;
	private ssh: NodeSSH;
	constructor() {
		this.client = new EC2Client(ec2ClientConfig);
		this.ssh = new NodeSSH();
	}

	async getinstances() {
		const instances: Instance[] = [];
		const command = new DescribeInstancesCommand({});

		const res = await this.client.send(command);

		res.Reservations?.forEach((reservation) => {
			reservation.Instances?.forEach((instance) => {
				instances.push(instance);
				instance.State?.Name == '';
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
		console.log(res);
		return res;
	}

	async terminateInstance(instanceId: string) {
		const commnand = new TerminateInstancesCommand({
			InstanceIds: [instanceId]
		});

		const res = await this.client.send(commnand);

		return res;
	}

	async getAZs() {
		const command = new DescribeAvailabilityZonesCommand({});

		const res = await this.client.send(command);

		return res;
	}

	async getARs() {
		const command = new DescribeRegionsCommand({});

		const res = await this.client.send(command);

		return res;
	}

	async getImages() {
		const command = new DescribeImagesCommand({
			Owners: ['self']
		});

		const res = await this.client.send(command);

		return res;
	}

	async getSGS() {
		const command = new DescribeSecurityGroupsCommand({});

		const res = await this.client.send(command);

		return res;
	}

	async getKeyPairs() {
		const command = new DescribeKeyPairsCommand({});

		const res = await this.client.send(command);

		return res;
	}
	async createInstance(
		data: Pick<RunInstancesCommandInput, 'ImageId' | 'KeyName' | 'MaxCount' | 'SecurityGroupIds'>
	) {
		const instanceConfig: RunInstancesCommandInput = {
			MaxCount: data.MaxCount,
			MinCount: 1,
			ImageId: data.ImageId,
			InstanceType: 't2.micro',
			KeyName: data.KeyName,
			SecurityGroupIds: data.SecurityGroupIds
		};

		const command = new RunInstancesCommand(instanceConfig);

		const res = await this.client.send(command);

		return res;
	}

	async exec(config: Config, command: string) {
		const conn = await this.ssh.connect(config);
		const result = await conn.exec(command, []);

		return result;
	}
}

const ec2operation = new EC2Operation();

export default ec2operation;
