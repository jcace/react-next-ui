import React from "react";
import NextContainer from "./NextContainer";
import { EventHandlers, TopologyConfig } from "./NextContainer.types";

export default {
  title: "NextContainer",
};

const sampleTopology = {
  nodes: [
    { name: "Router1", id: 1, type: "router" },
    { name: "Router2", id: 2, type: "router" },
  ],
  links: [{ source: 1, target: 2 }],
};

const sampleConfig: TopologyConfig = {
  autoLayout: true,
  identityKey: "id"
};

export const Basic = () => <NextContainer topologyData={sampleTopology} topologyConfig={sampleConfig}/>;

export const WithEventHandlers = () => {
  const sampleEvtHandlers: EventHandlers = {
    selectNode: (sender, event) =>
      alert(`You clicked a node with id ${event.id()}`),
  };

  return (
    <NextContainer
      topologyData={sampleTopology}
      topologyConfig={sampleConfig}
      eventHandlers={sampleEvtHandlers}
    />
  );
};
