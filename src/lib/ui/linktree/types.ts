export interface ITree {
    kind: 'group' | 'link',
    link: string | null,
    name: string,
    children: ITree[],
}