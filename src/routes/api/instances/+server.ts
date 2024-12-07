import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';

export const GET: RequestHandler = async () => {
	const instances = await ec2operation.getinstances();

	return json(instances);
};
