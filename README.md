# React NeXT UI

Based on ODL [NeXT UI Framework](https://github.com/opendaylight/next)
[![License: EPL-2.0](https://img.shields.io/badge/License-EPL-green.svg)](https://opensource.org/licenses/EPL-2.0)

## Installation

`npm install react-next-ui`

## Usage

```TSX
import React from "react";
import NextLibrary, { TopologyConfig } from "react-next-ui";

const sampleTopology = {
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

const App = () => (
  <div>
    <h1>NeXT UI Library Test</h1>
    <NextLibrary topologyData={sampleTopology} topologyConfig={sampleConfig} />
  </div>
);

export default App;
```
