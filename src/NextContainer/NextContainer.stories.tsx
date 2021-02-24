import React, { useEffect, useState } from "react";
import NextContainer from "./NextContainer";
import useNext from "./useNext";
import { EventHandlers, NxTopology, TopologyData } from "./NextContainer.types";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";

export default {
  title: "NextContainer",
};

const sampleTopology: TopologyData = {
  nodes: [
    { name: "Router1", id: 1, type: "router" },
    { name: "Router2", id: 2, type: "router" },
  ],
};

const sampleConfig: NxTopology = {
  autoLayout: true,
  adaptive: true,
  identityKey: "id",
  enableSmartNode: false,
};

// export const Basic = () => (
//   <NextContainer
//     topologyData={sampleTopology}
//     topologyConfig={sampleConfig}
//     style={{ height: "90vh", width: "650vw" }}
//   />
// );
// // https://devnetsupport.cisco.com/hc/en-us/articles/115011228488-Disabling-zooming-While-expanding-collapsing-nodeSet
// export const WithEventHandlers = () => {
//   let i = 10;
//   const sampleEvtHandlers: EventHandlers = {
//     clickLink: (sender, event) => {
//       alert(`You clicked a link with id ${event.id()}`);
//     },
//     pressA: (sender, event) => {
//       // const scaleFactor = 42 * sender.stageScale();

//       // const shiftedX =
//       //   (event.pageX + 42 - sender.width() / 2) * sender.stageScale();

//       // const shiftedY =
//       //   (event.pageY + 42 - sender.height() / 2) * sender.stageScale();

//       // console.log(`Raw: ${event.pageX}, ${event.pageY}`);
//       // console.log(`Shifted: ${shiftedX}, ${shiftedY}`);
//       // console.log(`Scale: ${sender.stageScale()}`);

//       // const topRightX = sender.stage().width() - 200;
//       // const topRightY = sender.stage().height() - 200;
//       // @ts-ignore
//       //* Insert Data
//       sender.insertData({ nodes: [{ id: i++ }] });

//       // * Add node
//       // sender.addNode({ id: i++ });

//       // * Set Data
//       // const newData = sender.getData();
//       // newData.nodes.push({ id: i++ });
//       // sender.setData(newData);
//     },
//     // topologyGenerated: (sender) => {
//     //   sender.eachNode((node) => console.log(`N ${node.id()}`));
//     //   sender.eachLink((link) => console.log(`L ${link.id()}`));
//     // },

//     pressF: (sender, event) => {
//       console.log("pressF");
//       sender.addLink({ source: 1, target: 2 });
//     },
//   };

//   return (
//     <NextContainer
//       topologyData={sampleTopology}
//       topologyConfig={sampleConfig}
//       eventHandlers={sampleEvtHandlers}
//     />
//   );
// };

// export const WithCustomFn = () => {
//   const afterLoad = (nxApp) => {
//     window.nx.define("testTooltipPolicy", nx.graphic.Topology.TooltipPolicy, {
//       properties: {
//         topology: {},
//         tooltipManager: {},
//       },
//       methods: {
//         init(args) {
//           this.sets(args);
//           this._tm = this.tooltipManager();
//         },
//         clickNode(node) {
//           // Overwrite click behavior: Do nothing.
//           // This prevents the popup from displaying in the Next container
//         },
//         clickLink(link) {
//           // Overwrite click behavior: Do nothing.
//           // This prevents the popup from displaying in the Next container
//         },
//       },
//     });
//     nxApp.tooltipManager().tooltipPolicyClass("testTooltipPolicy");
//   };

//   return (
//     <NextContainer
//       topologyData={sampleTopology}
//       topologyConfig={sampleConfig}
//       callback={afterLoad}
//     />
//   );
// };

export const WithHook = () => {
  const [nodeColor, setNodeColor] = useState("blue");
  const sampleEvtHandlers: EventHandlers = {
    clickLink: (sender, event) => {
      alert(`You clicked a link with id ${event.id()}`);
    },
    clickNode: (sender, event) =>
      alert(`You clicked a node with id ${event.id()}`),
  };
  const [topology, setTopology] = useState(sampleTopology);
  const [vTopology, setVTopology] = useState<any>();
  const afterLoad = (nxApp) => {
    window.nx.define("testTooltipPolicy", nx.graphic.Topology.TooltipPolicy, {
      properties: {
        topology: {},
        tooltipManager: {},
      },
      methods: {
        init(args) {
          this.sets(args);
          this._tm = this.tooltipManager();
        },
        clickNode(node) {
          // Overwrite click behavior: Do nothing.
          // This prevents the popup from displaying in the Next container
        },
        clickLink(link) {
          // Overwrite click behavior: Do nothing.
          // This prevents the popup from displaying in the Next container
        },
      },
    });
    nxApp.tooltipManager().tooltipPolicyClass("testTooltipPolicy");
  };

  // const { NextUI, insertData, eachNode, setData, getData } = useNext({
  //   topologyData: vTopology,
  //   topologyConfig: sampleConfig,
  //   eventHandlers: sampleEvtHandlers,
  //   callback: afterLoad,
  // });
  const { NextUI, nxApp } = useNext({
    topologyData: vTopology,
    topologyConfig: sampleConfig,
    eventHandlers: sampleEvtHandlers,
    callback: afterLoad,
  });

  useEffect(() => {
    const existingTopology = nxApp?.getData();
    // console.log("Existing topology");
    // console.log(existingTopology);

    // console.log("New Topology");
    // console.log(topology);

    // console.log("Equal?");
    // console.log(equal(existingTopology, topology));

    if (!equal(existingTopology, topology)) {
      setVTopology(topology);
    }
  });

  let i = 1;
  const clickHandlerAddNode = () => {
    nxApp?.insertData({ nodes: [{ id: 50 * i++ }] });
  };

  const clickHandlerAddLink = () => {
    nxApp?.insertData({ links: [{ source: 1, target: 2 }] });
  };

  const clickHandlerNewTopology = () => {
    setTopology({
      nodes: [{ id: 6 }, { id: 7 }, { id: 8 }],
      links: [{ source: 7, target: 8 }],
    });
  };

  const clickHandlerChangeColor = () => {
    setNodeColor((nodeColor) => (nodeColor === "red" ? "blue" : "red"));
    nxApp?.eachNode((node) => {
      if (node.id() === 6) {
        node.color(nodeColor);
      }
    });
  };

  return (
    <>
      {NextUI}
      <button onClick={clickHandlerAddNode}>Add Node</button>
      <button onClick={clickHandlerAddLink}>Add Link</button>
      <button onClick={clickHandlerNewTopology}>New Topology</button>
      <button onClick={clickHandlerChangeColor}>Change node color</button>
    </>
  );
};
