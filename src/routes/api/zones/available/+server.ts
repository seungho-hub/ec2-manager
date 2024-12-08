import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';

export const GET: RequestHandler = async () => {
	const res = await ec2operation.getAZs();

	const azs = res.AvailabilityZones;

	return json(azs);
};