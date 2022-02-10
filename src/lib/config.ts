import ViewerDocumentation from '$lib/viewers/documentation/ViewerDocumentation.svelte';
import ViewerDocument from '$lib/viewers/ViewerDocument.svelte';
import ViewerSourceFile from '$lib/viewers/ViewerSourceFile.svelte';
import LinkExternal from '$lib/ui/LinkExternal.svelte';

import TagCode from '$lib/documents/tags/TagCode.svelte';
import TagPre from '$lib/documents/tags/TagPre.svelte';
import TagReference from '$lib/documents/tags/TagReference.svelte';



export interface ProjectConfig {
    // Project title shown in the header and <title> tag
    title: string;
    // Landing page when no specific document is opened 
    defaultDocument: string;
    // Width (in px) of columns in multi-column viewer
    columnWidth: number;
    // 
    linktree: any;
    url: string;
}


// Tags
export const TAGS = {
    // tag viewers
    pre: TagPre,
    code: TagCode,
    codeblock: TagPre,
    reference: TagReference,
    // document viewers
    documentation: ViewerDocumentation,
    sourcefile: ViewerSourceFile,
    document: ViewerDocument,
    a: LinkExternal,
}
