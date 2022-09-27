export type DomJson = string | {
    type: string;
    props?: Record<string, string>,
    children: DomJson[]
}
