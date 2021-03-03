import React, { useEffect, useState } from "react";
import { NextContainerProps } from "./NextTypes";
import cloneDeep from "clone-deep";
import "../css/next.min.css";
import NextUI from "./NextUI";

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

  const mountEventHandlers = () => {
    if (!nxApp || !eventHandlers) return;

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

export default useNextUi;
