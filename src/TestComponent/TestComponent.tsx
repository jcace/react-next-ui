import React, { useEffect } from "react";
import Script from "react-load-script";
import { TestComponentProps } from "./TestComponent.types";

import "../css/next.min.css";

const topologyConfig = {
  adaptive: true,
  showIcon: true,
  identityKey: "name",
  autoLayout: true,
  showNavigation: true,
};

const TestComponent: React.FC = () => {
  const initializeNxLibrary = () => {
    // @ts-ignore
    const tempApp = new window.nx.ui.Application();
    tempApp.container(document.getElementById("nxContainer"));

    // @ts-ignore
    const nxTopologyApp = new window.nx.graphic.Topology(topologyConfig);

    nxTopologyApp.attach(tempApp); // Display the topology
  };

  return (
    <>
      <Script
        url="https://cdn.jsdelivr.net/gh/jcace/next-bower@1.0.1/js/next.min.js"
        onError={() =>
          console.error(
            "Error loading NEXT UI framework. Check your network connectivity."
          )
        }
        onLoad={initializeNxLibrary}
      />
      <div id="nxContainer" />
    </>
  );
};

export default TestComponent;
