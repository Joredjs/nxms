import { TestUseCase } from './useCases';
import {
	IAppServices,
	IErrResponse,
	IOKResponse,
	IPort,
	ITransactionParams,
} from '@nxms/core-main/domain';

export class ExamplePort implements IPort {
	appServices: IAppServices = {};

	constructor(appServices: IAppServices) {
		this.appServices = appServices;
	}

	get_test(
		info: ITransactionParams
	): Promise<IOKResponse<string> | IErrResponse> {
		const useCase = new TestUseCase(this.appServices);
		return useCase.execute(info);
	}
}
