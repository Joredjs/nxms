import {
	IErrResponse,
	IOKResponse,
	IRequestParams,
	IServices,
	ITransactionValid,
	TFrameworkRequest,
} from '@nxms/core/domain';
import { ResponseResult, normalizeError } from '@nxms/core/application';

export class SecurityClass<TFwReq extends IRequestParams> {
	#headerService: IServices['headers'];

	#response = new ResponseResult();

	constructor(headerService: IServices['headers']) {
		this.#headerService = headerService;
	}

	// Valida headers antes de obtener la info

	public validateHeaders(request: TFrameworkRequest<TFwReq>): boolean {
		try {
			if (!request.headers) {
				throw normalizeError({ errType: 'headers' });
			}

			const validMandatoryHeaders = this.#headerService.validateMandatory(
				request.headers
			);

			if (validMandatoryHeaders) {
				return this.#headerService.validate(request.headers);
			}
			return false;
		} catch (error) {
			throw normalizeError(error);
		}
	}

	// Valida headers después de obtener la info

	public validateRoute(info: ITransactionValid): boolean {
		if (this.#headerService.validateRouteHeaders(info)) {
			return true;
		}
		return false;
	}

	// TODO: Is it correct this to be here?
	public emptyHandler(): Promise<IOKResponse<string> | IErrResponse> {
		return new Promise((resolve) => {
			resolve(
				this.#response
					.resultErr({
						detail: 'Empty handler',
						errType: 'badConfigured',
						text: "The use case doesn't exists",
					})
					.unwrap()
			);
		});
	}
}
