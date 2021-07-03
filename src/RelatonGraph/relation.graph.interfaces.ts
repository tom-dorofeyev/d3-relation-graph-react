export interface IRelationDataset {
    nodes: IRelationNode[];
    links: IRelationLink[];
}

export interface IRelationNode {
    id: number | string;
    name: string; //node center text(should be one letter)
    label: string; //node bottom text
}

export interface IRelationLink {
    source: number | string; //id of node
    target: number | string; //id of node
    type: string;
    value: number; //the higher the number the wider the link line
}