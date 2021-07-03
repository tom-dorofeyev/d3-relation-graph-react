import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { IRelationDataset } from './relation.graph.interfaces';
import { drag } from './d3.drag';

interface IProps {
    height: number;
    width: number;
    dataset: IRelationDataset;
    onNodeClick?: (id: string | number) => any;
}

export default function RelationGraph(props: IProps) {
    const { onNodeClick = () => { } } = props;
    const [containerId] = useState(`b${uuidv4()}`);
    const { dataset, width, height } = props;

    useEffect(() => {
        d3.select(`#${containerId} svg`).remove();
        const links = dataset.links.map(d => Object.create(d));
        const nodes = dataset.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id))
            .force("link", d3.forceLink().distance((d: any) => d.distance))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(`#${containerId}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const linkLabel = svg.append('g')
            .attr("stroke", "#1673C8")
            .attr("stroke-width", 1)
            .selectAll('text')
            .data(links)
            .join('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', 10)
            .attr('font-weight', 'lighter')
            .text(d => d.type);

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 20)
            .attr("fill", '#C6E4FF')
            //@ts-ignore
            .call(drag(simulation));

        const labels = svg.append('g')
            .attr("stroke", "#0F0F0F")
            .attr("stroke-width", 1)
            .selectAll('text')
            .data(nodes)
            .join('text')
            .attr('font-size', 12)
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'lighter')
            .style('cursor', 'pointer')
            .on('click', function (event, d) {
                event.stopPropagation();
                onNodeClick(d.id);
            })
            .text(d => d.label);

        const names = svg.append('g')
            .attr("stroke", "#1673C8")
            .attr("stroke-width", 1)
            .selectAll('text')
            .data(nodes)
            .join('text')
            .attr('font-size', 14)
            .text(d => d.name);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            linkLabel
                .attr('transform', d => {
                    const [y1, y2, x1, x2] = [d.source.y, d.target.y, d.source.x, d.target.x];
                    const m = (y2 - y1) / (x2 - x1);
                    const aRadian = Math.atan(m);
                    let aDegrees = aRadian * (180 / Math.PI);
                    if (isNaN(aDegrees)) aDegrees = 0;
                    return `translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2}) rotate(${aDegrees})`;
                });

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y + 35);

            names
                .attr("x", d => d.x - 5)
                .attr("y", d => d.y + 5);
        });
    }, [containerId, dataset.links, dataset.nodes, width, height, onNodeClick])

    return (
        <div id={containerId}></div>
    );
}