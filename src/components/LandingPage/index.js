import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class LandingPage extends Component {
  render() {
    return <div>landing Page</div>;
  }
}
