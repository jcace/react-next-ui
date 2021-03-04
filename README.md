# React NeXT UI
[![License: EPL-2.0](https://img.shields.io/badge/License-EPL-green.svg)](https://opensource.org/licenses/EPL-2.0)


React component-based implementation of ODL [NeXT UI Framework](https://github.com/opendaylight/next). Built with Typescript. 

> WIP: This project is still a work-in-progress. Thus, not all types are defined yet, and there may be some edge cases where the library doesn't behave as expected.

## Installation

`npm install react-next-ui`

## Usage [V2.0]

For deprecated docs, please refer to [V1.X.md](docs/V1.X.md)

### Importing
> Note: Make sure you import both react-next-ui and the css files, as seen below

```typescript
import useNext, { TopologyConfig, TopologyData } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";
```

### Using

The NeXT library is exposed as a React Hook. Use it in your functional component to set up the library:
```tsx
    const { NextUI, nxApp } = useNext({ props });
```
#### Props
`topologyData`: The Topology Data to render, in the form {nodes:[], links:[]}. Any time this changes, the `NextUI` component will rerender.

`topologyConfig`: Configuration to apply to the Next container. See Typescript types and [Cisco DevNet Docs](https://developer.cisco.com/site/neXt/document/api-reference-manual/classes/nx.graphic.Topology/) for more information. 

`eventHandlers`: Object with event handlers for various actions. See [NextContainer Types](src/NextContainer/NextContainer.types.ts). It is possible to attach event handlers manually, directly on `nxApp`, however when passed into the `useNext` hook there is an internal `useEffect` to ensure they stay up to date.

`callback`: Function to execute once Next container is finished loading/mounting. Called with one argument equal to the instance of `nx.graphic.Topology` that was instantiated. Note that this is only called once in the component lifecycle (on first mount). It is not called when data changes. 

`style`: CSS styles to be passed to the NeXT div (useful for specifying dimensions of the container)


#### Returns
`NextUI`: The functional component to display the NeXT UI. Use {} syntax to place it in your JSX.

`nxApp`: Equal to "window.nx.topology" for this instance of the library. Allows you to call methods directly from the [NeXT Library](https://developer.cisco.com/site/neXt/document/api-reference-manual/classes/nx.graphic.Topology/), as you would on nx.topology.

## Examples

Refer to the examples in the [storybook](src/useNext/useNext.stories.tsx) for working implementations. You can run these locally with `yarn run storybook`.

### Basic Example

```tsx
import React from "react";
import useNext, { TopologyConfig, TopologyData } from "react-next-ui";
import "react-next-ui/build/css/next.min.css";

const App = () => {
  const sampleTopology: TopologyData = {
    nodes: [
      { name: "Router1", id: 1, type: "router" },
      { name: "Router2", id: 2, type: "router" },
    ],
    links: [{ source: 1, target: 2 }],
  };

  const sampleConfig: NxTopologyConfig = {
    autoLayout: true,
    adaptive: true,
    identityKey: "id",
  };
  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    style: { height: "90vh", width: "65vw" },
  });

  return <div>{NextUI}</div>;
};

export default App;
```

### Example with Event Handlers

Topology event handlers can be added on initialization by passing them into the `eventHandlers` prop. They will automatically be kept up to date if any closure data changes

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

  let i = 10;
  const sampleEvtHandlers: EventHandlers = {
    clickLink: (sender, event) => {
      // Display an alert to the user
      alert(`You clicked a link with id ${event.id()}`);
    },
    pressA: (sender, event) => {
      // Insert Data
      sender.addNode({ id: i++ });
    },
  };

  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    eventHandlers: sampleEvtHandlers,
    style: { height: "90vh", width: "65vw" },
  });

  return <>{NextUI}</>;
};

export default App;
```

### Example with Custom NeXT Function

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

   const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    callback: afterLoad,
    style: { height: "90vh", width: "65vw" },
  });

  return <>{NextUI}</>;
};

export default App;
```


### Example utilizing nxApp

nxApp is the second object returned from the useNext hook. It provides access to the `window.nx.graphic.Topology` instance used to construct the topology diagram. This allows you to interact directly with the NeXT functions in your React component. 

```tsx
export const App = () => {
  const [nodeColor, setNodeColor] = useState("blue");
  const [topology, setTopology] = useState(sampleTopology);

  const sampleTopology: TopologyData = {
  nodes: [
    { name: "Router1", id: 1, type: "router" },
    { name: "Router2", id: 2, type: "router" },
  ],
  links: [{ source: 1, target: 2 }],
};

const sampleConfig: NxTopologyConfig = {
  autoLayout: true,
  adaptive: true,
  identityKey: "id",
};

  const { NextUI, nxApp } = useNext({
    topologyData: topology,
    topologyConfig: sampleConfig,
  });

  let i = 1;
  const clickHandlerAddNode = () => {
    nxApp?.insertData({ nodes: [{ id: 50 * i++ }] });
  };

  const clickHandlerAddLink = () => {
    nxApp?.insertData({ links: [{ source: 1, target: 2 }] });
  };

  const clickHandlerNewTopology = () => {
    setTopology({
      nodes: [{ id: 1 }, { id: 2 }, { id: 8 }],
      links: [{ source: 1, target: 2 }],
    });
  };

  const clickHandlerChangeColor = () => {
    setNodeColor((nodeColor) => (nodeColor === "red" ? "blue" : "red"));
    nxApp?.eachNode((node) => {
      if (node.id() === 1) {
        node.color(nodeColor);
      }
    });
  };

  return (
    <>
      {NextUI}
      <button onClick={clickHandlerAddNode}>Add Node</button>
      <button onClick={clickHandlerAddLink}>Add Link</button>
      <button onClick={clickHandlerNewTopology}>New Topology</button>
      <button onClick={clickHandlerChangeColor}>Change node color</button>
    </>
  );
};

export default App;
```