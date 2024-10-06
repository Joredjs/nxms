import { IController, IPort, TServicesList } from './layers';
import { IHeadersStructure } from './validations';
import { TFrameworkParams } from './frameworks';
import { THttpMethods } from './http';

export type TDomainGroups = 'example';
export type TVersion = 'v1' | 'v2';

export enum EVersions {
	alpha = 'v1',
	beta = 'v2',
}

export enum EPrivacyLevel {
	public,
	user,
	admin,
}

export interface IDefaultToken {
	privacy: EPrivacyLevel;
	valid: number;
}

type TSchemaType =
	| 'number'
	| 'integer'
	| 'string'
	| 'boolean'
	| 'array'
	| 'object'
	| null;

export interface ISchemaProperties {
	additionalProperties?: boolean;
	type?: TSchemaType;
	properties?: any;
	required?: string[];
	pattern?: string;
	errorMessage?: string | any;
	enum?: string[];
	if?: { [key: string]: any };
	then?: any;
	else?: any;
	allOf?: any;
	minimum?: number;
	maximum?: number;
	optional?: boolean;
}

export interface ISchema {
	[key: string]: ISchemaProperties;
}

export type TRutaSchema = {
	[index in EVersions]?: ISchema;
};

export interface ISchemaObject {
	[key: string]: TRutaSchema;
}

export interface ISchemaClient {
	defaultOptions: any;
	errors: any;
	Validator: any;
}

export interface IRuta {
	globalHeaders?: string[];
	headers: string[];
	method: THttpMethods;
	path: string;
	port?: IPort;
	privacy: EPrivacyLevel[];
	schema: TRutaSchema;
	version?: TVersion;
}

export interface IRouteGroup<TFwParams> {
	cors: RegExp[];
	domains?: string[];
	group: TDomainGroups;
	handler?: TFrameworkParams<TFwParams>;
	headers: string[];
	paths: IRuta[];
	puerto: number;
	port?: IPort;
	versions: TVersion[];
	// Services: TServicesList[];
}

export interface IModule {
	name: TDomainGroups;
	puerto: number;
	headers?: { [head: string]: IHeadersStructure };
	schemas: ISchemaObject;
	services: TServicesList[];
	useValidations: boolean;
	versions: TVersion[];
}

export type TModules = {
	[mod in TDomainGroups]: IModule;
};

export interface IModuleRoute<TFwParams> {
	getRutas(): IRouteGroup<TFwParams>;
}

// TODO: dont use any (use class instance)
export type TMyModulesInstances = {
	[domain in TDomainGroups]: {
		Route: any;
		Port: any;
		Controller: any;
	};
};
