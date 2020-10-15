import React from "react";
import NextContainer from "./NextContainer";
import { EventHandlers, NxTopology, TopologyData } from "./NextContainer.types";

export default {
  title: "NextContainer",
};

const sampleTopology: TopologyData = {
  nodes: [
    { name: "Router1", id: 1, type: "router" },
    { name: "Router2", id: 2, type: "router" },
  ],
  links: [{ source: 1, target: 2 }],
};

const sampleConfig: NxTopology = {
  autoLayout: true,
  adaptive: true,
  identityKey: "id",
};

export const Basic = () => (
  <NextContainer
    topologyData={sampleTopology}
    topologyConfig={sampleConfig}
    style={{ height: "80vh", width: "60vw" }}
  />
);

export const WithEventHandlers = () => {
  const sampleEvtHandlers: EventHandlers = {
    clickLink: (sender, event) => {
      alert(`You clicked a link with id ${event.id()}`);
    },
    topologyGenerated: (sender) => {
      sender.eachNode((node) => console.log(`N ${node.id()}`));
      sender.eachLink((link) => console.log(`L ${link.id()}`));
    },
  };

  return (
    <NextContainer
      topologyData={sampleTopology}
      topologyConfig={sampleConfig}
      eventHandlers={sampleEvtHandlers}
    />
  );
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

  return (
    <NextContainer
      topologyData={sampleTopology}
      topologyConfig={sampleConfig}
      callback={afterLoad}
    />
  );
};
