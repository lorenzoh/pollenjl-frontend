import ViewerDocumentation from '$lib/viewers/documentation/ViewerDocumentation.svelte';
import ViewerDocument from '$lib/viewers/ViewerDocument.svelte';
import ViewerSourceFile from '$lib/viewers/ViewerSourceFile.svelte';
import LinkExternal from '$lib/ui/LinkExternal.svelte';

import TagCode from '$lib/documents/tags/TagCode.svelte';
import TagPre from '$lib/documents/tags/TagPre.svelte';
import TagReference from '$lib/documents/tags/TagReference.svelte';
import TagImg from './documents/tags/TagImg.svelte';
import TagMathBlock from './documents/tags/TagMathBlock.svelte';
import SearchPage from './special/SearchPage.svelte';
import Search16 from 'carbon-icons-svelte/lib/Search16';
import TagTransclusion from './documents/tags/TagTransclusion.svelte';


// Tags
export const TAGS = {
    // tag viewers
    pre: TagPre,
    code: TagCode,
    codeblock: TagPre,
    img: TagImg,
    mathblock: TagMathBlock,
    reference: TagReference,
    transclusion: TagTransclusion,
    // document viewers
    documentation: ViewerDocumentation,
    sourcefile: ViewerSourceFile,
    document: ViewerDocument,
    a: LinkExternal,
}


export const SPECIAL_PAGES = {
    search: {
        component: SearchPage,
        name: 'Search',
        icon: Search16
    },
}