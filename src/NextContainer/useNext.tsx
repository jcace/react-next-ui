import React, { CSSProperties, useEffect, useState } from "react";
import Script from "react-load-script";
import {
  NextContainerProps,
  NxTopology,
  TopologyData,
} from "./NextContainer.types";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";
import "../css/next.min.css";

/**
 * NeXT UI React Hook
 * @param param0
 * @returns {NextUI,nxApp} NextUI component to render, and nxApp for interaction with it
 */
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
    // @ts-ignore
    nxApp.setData(cloneDeep(topologyData));
    mountEventHandlers();
  }, [topologyData, nxApp]);

  useEffect(() => {
    if (!nxApp) return;
    mountEventHandlers();
  }, [eventHandlers]);

  // useEffect(() => {
  //   if (!nxApp) return;
  //   console.log("Resetting topologyConfig to");
  //   console.log(topologyConfig);
  //   // @ts-ignore
  //   nxApp!.nodeConfig(topologyConfig.nodeConfig);
  //   // @ts-ignore
  //   nxApp!.linkConfig(topologyConfig.linkConfig);
  // });

  const mountEventHandlers = () => {
    // console.log("Called mountEvtHandlers but");
    // console.log(Boolean(nxApp));
    // console.log(Boolean(eventHandlers));
    if (!nxApp || !eventHandlers) return;

    // console.log("Mounted event handlers");
    // console.log(eventHandlers);

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

    nxTopologyApp.attach(tempApp); // Attach topology to div and display
    nxTopologyApp.data(topologyData);
    setNxApp(nxTopologyApp);
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

class NextUI extends React.Component<
  { style: CSSProperties; init: () => void },
  {}
> {
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
