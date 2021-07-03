import { IRelationDataset } from "./relation.graph.interfaces";

export const exampleData: IRelationDataset = {
    nodes: [
        { id: 5, name: 'C', label: 'company' },
        { id: 1, name: 'E', label: 'developer' },
        { id: 2, name: 'E', label: 'developer' },
        { id: 3, name: 'E', label: 'developer' },
        { id: 4, name: 'E', label: 'developer' },
        { id: 6, name: 'E', label: 'developer' },
        { id: 7, name: 'E', label: 'developer' },
    ],
    links: [
        { source: 5, target: 1, value: 1, type: 'employee' },
        { source: 5, target: 2, value: 1, type: 'employee' },
        { source: 5, target: 3, value: 1, type: 'employee' },
        { source: 5, target: 4, value: 1, type: 'employee' },
        { source: 5, target: 6, value: 1, type: 'employee' },
        { source: 5, target: 7, value: 1, type: 'employee' },
    ]
}