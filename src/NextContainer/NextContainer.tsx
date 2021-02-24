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

const NextContainer: React.FC<NextContainerProps> = ({
  topologyConfig,
  eventHandlers,
  topologyData,
  style,
  callback,
  afterDraw,
}) => {
  const [nxApp, setNxApp] = useState();
  const [nxLoaded, setNxLoaded] = useState(false);
  const [previousTopology, setPreviousTopology] = useState({});
  // @ts-ignore
  const nxAppLoaded = nxApp && nxLoaded && window.nx;

  console.log("Running in dev");
  const setNxBindings = (isNxLoaded, newNxApp) => {
    setNxLoaded(isNxLoaded);
    setNxApp(newNxApp);
  };

  const mountEventHandlers = () => {
    if (!nxAppLoaded || !eventHandlers) return;

    Object.entries(eventHandlers).forEach(([event, eventHandler]) => {
      // @ts-ignore
      nxApp!.off(event); // We need to remove all event handlers first, because ".on" adds a NEW one, it doesn't REPLACE an existing one.
      // @ts-ignore
      nxApp!.on(event, eventHandler)!;
    });
  };

  // Put NCD topology data into the nx diagram whenever it changes
  // ! Note: Weird behavior starts happening if we don't run this on "nxLoaded" AND "nxApp" changing.
  //   On first glance it would appear that the only dependencies we need is "nxApp" and "ncdTopologyData", however, things
  //   won't show up properly if we do that. Kind of quirky but OK for now,
  useEffect(() => {
    if (!nxAppLoaded) {
      return;
    }

    // Copying the topologyData is very important, as the NeXT library will mutate it
    // as soon as we call nxApp.data(), it will have x,y coords appended.
    // By copying it before every comparison, we prevent this behavior.
    const topologyCopy: TopologyData = cloneDeep(topologyData);

    if (equal(previousTopology, topologyCopy)) {
      // Prevent re-drawing the diagram if the topology has not changed
      return;
    }

    // @ts-ignore
    nxApp!.data(); // We must clear the data first otherwise it won't draw. For some reason, .clear() ignores the window sizing.
    // @ts-ignore
    nxApp!.data(cloneDeep(topologyCopy))!;
    setPreviousTopology(cloneDeep(topologyCopy));

    // Call the user's afterDraw callback
    if (afterDraw) {
      afterDraw();
    }
  }, [nxLoaded, nxApp, topologyData]);

  // Everytime a new render happens, make sure we update event handlers otherwise NEXT won't know that their state changed
  // This is because when event handlers are bound, they store all their variables in their closures. Updating the state won't change them, unless
  // we remount them.
  useEffect(() => {
    if (!nxAppLoaded) {
      return;
    }
    mountEventHandlers();
  });

  const initializeNxLibrary = () => {
    // @ts-ignore
    const tempApp = new window.nx.ui.Application();
    tempApp.container(document.getElementById("nxContainer"));

    // @ts-ignore
    const nxTopologyApp = new window.nx.graphic.Topology(topologyConfig);

    nxTopologyApp.attach(tempApp); // Display the topology

    setNxBindings(true, nxTopologyApp);

    if (callback) {
      callback(nxTopologyApp);
    }
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
      <div id="nxContainer" style={style} />
    </>
  );
};

export default React.memo(NextContainer);
