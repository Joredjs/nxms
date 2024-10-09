import { IMicroAppConfig } from '@nxms/core/domain';

export const appConfig: IMicroAppConfig = {
	addDomainName: true,
	bodyLimit: '5mb',
	debug: { cors: true, paths: true, routes: true },
};