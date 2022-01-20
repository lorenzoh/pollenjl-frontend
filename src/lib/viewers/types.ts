export interface ISymbolAttrs {
	symbol_id: string;
	name: string;
	module_id: string;
	public: boolean;
	kind: string;
	backlinks: IBacklink[];

}
export interface IBacklink {
	docid: string,
	title: string,
	tag: string,
}

export interface IFunctionAttrs extends ISymbolAttrs {
	methods: IMethodData[];
}

export interface IModuleAttrs extends ISymbolAttrs {
	symbols: IModuleSymbol[],
	files: string[],
}

export interface IStructAttrs extends ISymbolAttrs {
	methods: IMethodData[];
}

export interface IMethodData {
	method_id: string;
	symbol_id: string;
	file: string;
	line: number;
	signature: string;
}

export interface IModuleSymbol {
	symbol_id: string,
	kind: ISymbolKind,
	public: boolean,
	name: string,
}
export type ISymbolKind = 'function' | 'struct' | 'abstract type' | 'module'
