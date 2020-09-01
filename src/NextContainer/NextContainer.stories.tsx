import React from "react";
// import NextContainer from "./NextContainer";
import useNextUi from "./useNextUi";
import {
  EventHandlers,
  TopologyConfig,
  TopologyData,
} from "./NextContainer.types";

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

const sampleConfig: TopologyConfig = {
  autoLayout: true,
  identityKey: "id",
};

export const Basic = () => {
  const { NextContainer, nxApp, nxReady } = useNextUi({
    topologyConfig: sampleConfig,
    topologyData: sampleTopology,
  });

  if (nxReady) {
    const tooltipPolicy = createTooltipPolicy(window.nx);
    nxApp?.tooltipManager().tooltipPolicyClass(tooltipPolicy);
  }

  return <div>{NextContainer}</div>;
};

const createTooltipPolicy = (nx) => {
  const policyName = "ExtendedTooltipPolicy";
  nx.define(policyName, nx.graphic.Topology.TooltipPolicy, {
    properties: {
      topology: {},
      tooltipManager: {},
    },
    methods: {
      // inherit methods and properties from base class (nx.graphic.Topology.TooltipPolicy)
      init(args) {
        // this.inherited(args);
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
  return policyName;
};

// export const Basic = () => (
//   <NextContainer topologyData={sampleTopology} topologyConfig={sampleConfig} />
// );

// export const WithEventHandlers = () => {
//   const sampleEvtHandlers: EventHandlers = {
//     clickLink: (sender, event) => {
//       alert(`You clicked a link with id ${event.id()}`)
//     },
//     selectNode: (sender, event) => alert(`You clicked a node with id ${event.id()}`),
//   };

//   return (
//     <NextContainer
//       topologyData={sampleTopology}
//       topologyConfig={sampleConfig}
//       eventHandlers={sampleEvtHandlers}
//     />
//   );
// };
