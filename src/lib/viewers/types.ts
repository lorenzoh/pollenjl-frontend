import type { IDocumentNode } from '../documents/types';

export interface IViewerFunctionData {
	symbol_id: string;
	name: string;
	module_id: string;
	public: boolean;
	methods: IMethodData[];
	documentation: IDocumentNode;
}

export interface IMethodData {
	method_id: string;
	symbol_id: string;
	file: string;
	line: number;
	signature: string;
}

export type IViewerKind = 'documentation' | 'source' | 'document';
export interface IViewerData {
    kind: IViewerKind,

}
