import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// components
import Map from "components/Map";
import Strawberry from "models/Strawberry";

// styled-components
import { Header, TextIcon, IconStyled, MainContent } from "./styles";

@inject("store")
@observer
class RightContent extends Component {
  render() {
    const {
      areRequiredFieldsSet,
      isMap,
      toggleSidebar,

      state
    } = this.props.store.app;

    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {this.props.mobile ? (
          <Header>
            <TextIcon>
              <IconStyled
                type="menu-unfold"
                onClick={toggleSidebar}
                style={{ marginRight: 10 }}
              />
              <div style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>
                Strawberry Disease Forecast Models
              </div>
            </TextIcon>
            <div style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>NEWA</div>
          </Header>
        ) : (
          <Header>
            <div>Strawberry Disease Forecast Models</div>
            <div>
              <div style={{ textAlign: "right" }}>NEWA</div>
              <div style={{ fontSize: ".7rem", letterSpacing: "2px" }}>
                Network for Environment and Weather Applications
              </div>
            </div>
          </Header>
        )}

        <MainContent>
          {state.name === "All States" && (
            <h3>
              Click one of the icons on the map or select a state and a station
              from the left panel.
            </h3>
          )}
          <br />
          {isMap && <Map {...this.props} />}
          {areRequiredFieldsSet && <Strawberry {...this.props} />}
        </MainContent>
      </div>
    );
  }
}

export default RightContent;
