import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';

export const GET: RequestHandler = async () => {
	const instances = await ec2operation.getinstances();

	return json(instances);
};

export const POST: RequestHandler = async ({ request }) => {
	const { imageId, keyPairId, maxCount, sgId } = await request.json();

	const res = await ec2operation.createInstance({
		ImageId: imageId,
		KeyName: keyPairId,
		MaxCount: maxCount,
		SecurityGroupIds: [sgId]
	});

	const instance = res.Instances?.[0];

	return json(instance);
};
