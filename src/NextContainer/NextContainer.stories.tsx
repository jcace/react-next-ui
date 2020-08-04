import React from "react";
import NextContainer from "./NextContainer";

export default {
  title: "NextContainer"
};

const testTop = {
  nodes: [{"name": "Router1", "id": 1, "type": "router"}, {"name": "Router2", "id": 2, "type": "router"}],
  links: [{ "source": "Router1", "target": "Router2" },]
}



export const Primary = () => <NextContainer topologyData={testTop}/>;

