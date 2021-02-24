import React, { useEffect, useState } from "react";
import Script from "react-load-script";
import {
  NextContainerProps,
  NxTopology,
  TopologyData,
} from "./NextContainer.types";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";
import "../css/next.min.css";

const useNextUi = ({
  topologyConfig,
  eventHandlers,
  topologyData,
  style,
  callback,
}: NextContainerProps) => {
  const [nxApp, setNxApp] = useState();
  useEffect(() => {
    if (!nxApp) return;

    console.log(nxApp);

    nxApp.setData(topologyData);
    mountEventHandlers();
  }, [topologyData]);

  const mountEventHandlers = () => {
    if (!nxApp || !eventHandlers) return;
    console.log("Mounting event handlers 4 reals");

    Object.entries(eventHandlers).forEach(([event, eventHandler]) => {
      // @ts-ignore
      nxApp!.off(event); // We need to remove all event handlers first, because ".on" adds a NEW one, it doesn't REPLACE an existing one.
      // @ts-ignore
      nxApp!.on(event, eventHandler)!;
    });
  };

  const initializeNxLibrary = () => {
    // @ts-ignore
    const tempApp = new window.nx.ui.Application();
    tempApp.container(document.getElementById("nxContainer"));

    // @ts-ignore
    const nxTopologyApp = new window.nx.graphic.Topology(topologyConfig);

    nxTopologyApp.attach(tempApp); // Display the topology
    nxTopologyApp.data(topologyData);
    // nxApp = nxTopologyApp;
    setNxApp(nxTopologyApp);
    // console.log("Set nxApp");
    // console.log(nxApp);

    mountEventHandlers();

    if (callback) {
      callback(nxTopologyApp);
    }
  };

  return {
    NextUI: <NextUI init={initializeNxLibrary} style={style} />,
    nxApp,
  };
};

class NextUI extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.style !== this.props.style) return true;

    return false; // Never rerender/re-load the script unless div style changes
  }

  render() {
    return (
      <>
        <Script
          url="https://cdn.jsdelivr.net/gh/jcace/next-bower@1.0.1/js/next.min.js"
          onError={() =>
            console.error(
              "Error loading NEXT UI framework. Check your network connectivity."
            )
          }
          onLoad={this.props.init}
        />
        <div id="nxContainer" style={this.props.style} />
      </>
    );
  }
}

export default useNextUi;
