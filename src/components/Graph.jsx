import React from 'react';
import {Sigma} from 'react-sigma'
import {GRAPH_SETTINGS} from '../helpers/constants'

const Graph = ({nodes, edges }) => {

    /* TODO:
        https://codesandbox.io/s/349znkyn21?from-embed
        Using this codesandbox as an example with mocked data
        Check how the edges are labeled
    */
    const graphData = {
        nodes: [],
        edges: []
    }
    // mocked data
    graphData.nodes.push({
        id: "user",
        label: "Vasanth",
        x: 5,
        y: 8,
        size: 9,
        color: "#000000",
        borderColor: "#FF3333",
      });

    graphData.edges.push({
        id: "userEdge",
        source: "device2",
        target: "user",
        size: 3,
        color: "#ff0000",
        neighborsOf: "n" + ((Math.random() * 2) | 0),
        nodesBy: "n" + ((Math.random() * 2) | 0),

    });

      graphData.edges.push({
        id: "userEdge2",
        source: "device1",
        target: "user",
        label: "hiiii",
        size: 3,
        color: "#ff0000",
        neighborsOf: "n" + ((Math.random() * 2) | 0),
        nodesBy: "n" + ((Math.random() * 2) | 0),
      });

      graphData.nodes.push({
        id: "device2",
        label: "Ipad",
        x: 10,
        y: 10,
        size: 8,
        color: "#000000",
        borderColor: "#FF3333",
      })

      graphData.nodes.push({
        id: "device1",
        label: "Tablet",
        x: 1,
        y: 10,
        size: 8,
        color: "#000000",
        borderColor: "#FF3333",

      })

    return (
        <Sigma 
        renderer="canvas"
        settings={GRAPH_SETTINGS}
        style={{ margin: '2rem',width: "1000px", height:"600px", backgroundColor: "#fff", display:"flex"}}
        graph={graphData}>

        </Sigma>
    )
};

export default Graph;