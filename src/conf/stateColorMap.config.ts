import type { InstanceStateName } from '@aws-sdk/client-ec2';

const stateColorMap: Record<InstanceStateName, string> = {
	running: '#2BB534',
	stopped: '#A4A4AD',
	'shutting-down': '#A4A4AD',
	pending: '#A4A4AD',
	stopping: '#A4A4AD',
	terminated: '#A4A4AD'
};

export default stateColorMap;
