import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';

export const PUT: RequestHandler = async ({ request, params }) => {
	const { operation } = await request.json();
	const { id } = params;

	switch (operation) {
		case 'start':
			await ec2operation.startInstance(id as string);
			break;
		case 'stop':
			await ec2operation.stopInstance(id as string);
			break;
		case 'reboot':
			await ec2operation.rebootInstance(id as string);
			break;
		case 'terminate':
			await ec2operation.terminateInstance(id as string);
	}

	return json({});
};
