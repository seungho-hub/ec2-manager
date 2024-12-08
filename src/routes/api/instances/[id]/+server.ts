import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';

export const PUT: RequestHandler = async ({ request, params }) => {
	const { operation } = await request.json();
	const { id } = params;

	let operatedInstance;

	switch (operation) {
		case 'start':
			operatedInstance = await ec2operation.startInstance(id as string);
			break;
		case 'stop':
			operatedInstance = await ec2operation.stopInstance(id as string);
			break;
		case 'reboot':
			operatedInstance = await ec2operation.rebootInstance(id as string);
			break;
	}

	return json({});
};
