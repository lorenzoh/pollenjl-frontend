import TextAlignJustify16 from 'carbon-icons-svelte/lib/TextAlignJustify16';
import CodeReference16 from 'carbon-icons-svelte/lib/CodeReference16';
import ScriptReference16 from 'carbon-icons-svelte/lib/ScriptReference16';

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


export interface IDocumentTitle {
	kind: 'document' | 'documentation' | 'sourcefile';
	text: string;
}

export function getTitleAttrs(documentId: string): IDocumentTitle {
	const parts = documentId.split('/')
	if (documentId.startsWith("references")) {
		return {
			kind: 'documentation',
			text: parts[parts.length - 1],
		}

	} else if (documentId.startsWith("sourcefiles")) {
		return {
			kind: 'sourcefile',
			text: documentId,
		}
	} else if (documentId.startsWith("documents")) {
		return {
			kind: 'document',
			text: `${parts[0]}/.../${parts[parts.length - 1]}`,
		}
	}
}


export const DOCUMENT_ICONS = {
	document: TextAlignJustify16,
	documentation: CodeReference16,
	sourcefile: ScriptReference16

}