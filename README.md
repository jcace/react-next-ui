# React NeXT UI
[![License: EPL-2.0](https://img.shields.io/badge/License-EPL-green.svg)](https://opensource.org/licenses/EPL-2.0)


React component-based implementation of ODL [NeXT UI Framework](https://github.com/opendaylight/next). Built with Typescript. 

> WIP: This project is still a work-in-progress. Thus, not all types are defined yet, and there may be some edge cases where the library doesn't behave as expected.

## Installation

`npm install react-next-ui`

## Usage

### Importing
> Note: Make sure you import both react-next-ui and the css files, as seen below

```typescript
import NextContainer, { TopologyConfig, TopologyData } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";
```

### Using

In your JSX, render the component as follows:
```tsx
  <NextContainer />
```
#### Props
`topologyData`: The Topology Data to render, in the form {nodes:[], links:[]}

`topologyConfig`: Configuration to apply to the Next container

`eventHandlers`: Object with event handlers for various actions. See [NextContainer Types](src/NextContainer/NextContainer.types.ts)

`callback`: Function to execute once Next container is finished loading/mounting. Called with one argument equal to the instance of `nx.graphic.Topology` that was instantiated

`style`: CSS styles to be passed to the NeXT div (useful for specifying dimensions of the container)

`afterDraw`: Function to invoke every time the NeXT diagram is re-drawn

## Examples


### Basic Example

```tsx
import React from "react";
import NextContainer, { TopologyConfig, TopologyData } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";

const App = () => {
  const sampleTopology: TopologyData = {
    nodes: [
      { name: "Router1", id: 1, type: "router" },
      { name: "Router2", id: 2, type: "router" },
    ],
    links: [{ source: 1, target: 2 }],
  };

  const sampleConfig: TopologyConfig = {
    autoLayout: true,
    adaptive: true,
    identityKey: "id",
  };

  return (
  <div>
    <h1>NeXT UI Library Test</h1>
    <NextContainer topologyData={sampleTopology} topologyConfig={sampleConfig} style={{ width: "50vw", height: "50vh" }}/>
  </div>
  )
};

export default App;
```

### Example with Event Handlers

Topology event handlers can be added on initialization by passing them into the `eventHandlers` prop.

```tsx
import React from "react";
import NextContainer, { TopologyConfig, TopologyData } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";


const App = () => {
  const sampleTopology: TopologyData = {
    nodes: [
      { name: "Router1", id: 1, type: "router" },
      { name: "Router2", id: 2, type: "router" },
    ],
    links: [{ source: 1, target: 2 }],
  };

  const sampleConfig: TopologyConfig = {
    autoLayout: true,
    adaptive: true,
    identityKey: "id",
  };

  const sampleEvtHandlers: EventHandlers = {
    clickLink: (sender, event) => {
      alert(`You clicked a link with id ${event.id()}`);
    },
    selectNode: (sender, event) =>
      alert(`You clicked a node with id ${event.id()}`),
  };

  return (
  <div>
    <h1>NeXT UI Library Test</h1>
    <NextContainer topologyData={sampleTopology} topologyConfig={sampleConfig} eventHandlers={sampleEvtHandlers}/>
  </div>
  )
};

export default App;
```

### Example with Custom Next Function

Once the Next component has finished rendering, it will call the `callback` prop with the `nx.graphic.Topology` instance as an argument. With this, you can further configure the Next UI by defining custom classes. See the [tutorials](https://github.com/NeXt-UI/next-tutorials) for more info. 

> Note: The global Next class `window.nx` is also available globally as soon as the script is done loading. 

```tsx
import React from "react";
import NextContainer, { TopologyConfig, TopologyData, TopologyNode, TopologyLink } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";


const App = () => {
  const sampleTopology: TopologyData = {
    nodes: [
      { name: "Router1", id: 1, type: "router" },
      { name: "Router2", id: 2, type: "router" },
    ],
    links: [{ source: 1, target: 2 }],
  };

  const sampleConfig: TopologyConfig = {
    autoLayout: true,
    adaptive: true,
    identityKey: "id",
  };

  const afterLoad = (nxApp: any) => {
    // @ts-ignore
    window.nx.define("testTooltipPolicy", window.nx.graphic.Topology.TooltipPolicy, {
      properties: {
        topology: {},
        tooltipManager: {},
      },
      methods: {
        init(args: any) {
          // @ts-ignore
          this.sets(args);
          // @ts-ignore
          this._tm = this.tooltipManager();
        },
        clickNode(node: TopologyNode) {
          // Overwrite click behavior: Do nothing.
          // This prevents the popup from displaying in the Next container
        },
        clickLink(link: TopologyLink) {
          // Overwrite click behavior: Do nothing.
          // This prevents the popup from displaying in the Next container
        },
      },
    });
    nxApp.tooltipManager().tooltipPolicyClass("testTooltipPolicy");
  };

  return (
  <div>
    <h1>NeXT UI Library Test</h1>
    <NextContainer topologyData={sampleTopology} topologyConfig={sampleConfig} callback={afterLoad}/>
  </div>
  )
};

export default App;
```