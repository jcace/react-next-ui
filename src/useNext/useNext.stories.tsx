import React, { useState } from "react";
import useNext from "./useNext";
import { EventHandlers, TopologyData, NxTopologyConfig } from "./NextTypes";

export default {
  title: "useNext",
};

const sampleTopology: TopologyData = {
  nodes: [
    { name: "Router1", id: 1, type: "router" },
    { name: "Router2", id: 2, type: "router" },
  ],
  links: [{ source: 1, target: 2 }],
};

const sampleConfig: NxTopologyConfig = {
  autoLayout: true,
  adaptive: true,
  identityKey: "id",
};

export const Basic = () => {
  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    style: { height: "90vh", width: "65vw" },
  });

  return <>{NextUI}</>;
};

export const WithEventHandlers = () => {
  let i = 10;
  const sampleEvtHandlers: EventHandlers = {
    clickLink: (sender, event) => {
      // Display an alert to the user
      alert(`You clicked a link with id ${event.id()}`);
    },
    pressA: (sender, event) => {
      // Insert Data
      sender.addNode({ id: i++ });
    },
  };

  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    eventHandlers: sampleEvtHandlers,
    style: { height: "90vh", width: "65vw" },
  });

  return <>{NextUI}</>;
};

export const WithCustomFn = () => {
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

  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    callback: afterLoad,
    style: { height: "90vh", width: "65vw" },
  });

  return <>{NextUI}</>;
};

export const withNxAppUsed = () => {
  const [nodeColor, setNodeColor] = useState("blue");
  const [topology, setTopology] = useState(sampleTopology);

  const { NextUI, nxApp } = useNext({
    topologyData: topology,
    topologyConfig: sampleConfig,
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
      nodes: [{ id: 1 }, { id: 2 }, { id: 8 }],
      links: [{ source: 1, target: 2 }],
    });
  };

  const clickHandlerChangeColor = () => {
    setNodeColor((nodeColor) => (nodeColor === "red" ? "blue" : "red"));
    nxApp?.eachNode((node) => {
      if (node.id() === 1) {
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
