import * as d3 from 'd3';

export function drag(simulation: d3.Simulation<any, any>) {

    function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        simulation.force('charge', null);
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}