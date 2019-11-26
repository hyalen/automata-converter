import React from 'react';
import {Sigma} from 'react-sigma'

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

    const settings = {
        batchEdgesDrawing: true,
        drawEdges: true,
        drawLabels: true,
        drawEdgeLabels: true,
        hideEdgesOnMove: false,
        animationsTime: 3000,
        clone: false,
        doubleClickEnabled: true,
        mouseWheelEnabled: true,
        minNodeSize: 5,
        maxNodeSize: 10,
        minArrowSize: 2,
        minEdgeSize: 0.5,
        maxEdgeSize: 1,
        defaultNodeBorderColor: "#000",
        defaultHoverLabelBGColor: "transparent",
        labelHoverColor: "transparent",
        defaultLabelSize: 11
    };
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
        settings={settings}
        style={{ margin: '2rem',width: "1000px", height:"600px", backgroundColor: "#fff", display:"flex"}}
        graph={graphData}>

        </Sigma>
    )
};

export default Graph;