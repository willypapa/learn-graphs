import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A graph consists of vertices, edges, 
 * and an incidence function which maps
 * each edge to it's end vertices.
 */
export class Graph {

    constructor(
        public vertices: Vertex[] = [],
        public edges: Edge[] = [],
        public incidenceMap: IncidenceMap
    ) {
        // TODO: check that incidenceFn maps every edge
    }

    /**
     * Two vertices are adjacent if 
     * there is an edge connecting them.
     * 
     * @param first
     * @param second 
     */
    adjacentVertices(
        first: Vertex,
        second: Vertex
    ): boolean {
        if (this.edges === []) {
            return false;
        }

        for (let edge of this.edges) {
            const [end1, end2] = this.incidenceMap(edge);

            const isConnectingEdge: boolean =
                (first.equalTo(end1) && second.equalTo(end2))
                || (first.equalTo(end2) && second.equalTo(end1));

            if (isConnectingEdge) {
                return true;
            }
        }

        return false;
    }

    /**
     * Two edges are adjacent if there 
     * is a common vertex between them.
     * 
     * @param first
     * @param second 
     */
    adjacentEdges(
        first: Edge,
        second: Edge
    ): boolean {
        const [firstEdgeEnd1, firstEdgeEnd2] = this.incidenceMap(first);
        const [secondEdgeEnd1, secondEdgeEnd2] = this.incidenceMap(first);

        return firstEdgeEnd1.equalTo(secondEdgeEnd1)
            || firstEdgeEnd1.equalTo(secondEdgeEnd2)
            || firstEdgeEnd2.equalTo(secondEdgeEnd1)
            || firstEdgeEnd2.equalTo(secondEdgeEnd2);
    }

    /**
     * Two vertices are neighbours
     * if they are adjacent and distinct.
     * 
     * @param first 
     * @param second 
     */
    neighbours(
        first: Vertex,
        second: Vertex
    ): boolean {
        if (first.equalTo(second)) {
            return false;
        }

        return this.adjacentVertices(first, second);
    }

    /**
     * Returns a set neighbouring vertices.
     * 
     * @param vertex
     */
    allNeighbours(check: Vertex): Set<Vertex> {
        const neighbours: Set<Vertex> = new Set();

        for (let vertex of this.vertices) {
            if (this.neighbours(check, vertex)) {
                neighbours.add(vertex);
            }
        }

        return neighbours;
    }

}