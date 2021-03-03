import React, { CSSProperties } from "react";
import Script from "react-load-script";

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

export default NextUI;
