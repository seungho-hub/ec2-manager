import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import ec2operation from '$lib/ec2';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
	const { ip, keyName, command } = await request.json();

	const result = await ec2operation.exec(
		{
			host: ip,
			username: 'ec2-user',
			privateKeyPath: path.join(process.cwd(), 'key', keyName + '.pem')
		},
		command
	);

	return json(result);
};
