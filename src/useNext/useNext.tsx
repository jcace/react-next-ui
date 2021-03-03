import React, { useEffect, useState } from "react";
import { NextContainerProps, NxTopology } from "./NextTypes";
import cloneDeep from "clone-deep";
import "../css/next.min.css";
import NextUI from "./NextUI";

// Define 'nx' on the window object so window.nx... calls don't give type errors
declare global {
  interface Window {
    nx: any;
  }
}

/**
 * NeXT UI React Hook
 * @param {topologyConfig, eventHandlers, topologyData, style, callback}
 * @returns { NextUI, nxApp } NextUI: component to render. Use {} syntax ie <>{NextUI}</>. nxApp:
 */
const useNextUi = ({
  topologyConfig,
  eventHandlers,
  topologyData,
  style,
  callback,
}: NextContainerProps) => {
  const [nxApp, setNxApp] = useState<NxTopology>();

  /**
   * Set topology data whenever it changes, or if nxApp is re-loaded for some reason.
   */
  useEffect(() => {
    if (!nxApp) return;

    nxApp.setData(cloneDeep(topologyData));
    mountEventHandlers();
  }, [topologyData, nxApp]);

  /**
   * Ensure eventHandlers are kept up to date if they change or their closure variables change
   */
  useEffect(() => {
    if (!nxApp) return;
    mountEventHandlers();
  }, [eventHandlers]);

  const mountEventHandlers = () => {
    if (!nxApp || !eventHandlers) return;

    Object.entries(eventHandlers).forEach(([event, eventHandler]) => {
      nxApp.off(event); // We need to remove all event handlers first, because ".on" adds a NEW one, it doesn't REPLACE an existing one.
      nxApp.on(event, eventHandler)!;
    });
  };

  const initializeNxLibrary = () => {
    const tempApp = new window.nx.ui.Application();
    tempApp.container(document.getElementById("nxContainer"));

    // Instantiate a new nx Topology
    const nxTopologyApp = new window.nx.graphic.Topology(topologyConfig);

    nxTopologyApp.attach(tempApp); // Attach topology to div and display
    nxTopologyApp.data(topologyData); // Set the initial topology data

    // Save the instance into state
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

export default useNextUi;
