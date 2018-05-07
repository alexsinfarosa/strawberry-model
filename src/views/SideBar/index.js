import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
// import Switch from "antd/lib/switch";
// import "antd/lib/switch/style/css";

import Button from "antd/lib/button";
import "antd/lib/button/style/css";

// components
import Subject from "components/Subject";
import State from "components/State";
import Station from "components/Station";
import DatePicker from "components/DatePicker";
import Acknowledgements from "components/Acknowledgements";
import MoreInfo from "components/MoreInfo";

import { Flex, Box } from "reflexbox";

// styled-components
import { SideBarContent, RiskLevel } from "./styles";

@inject("store")
@observer
class SideBar extends Component {
  // toggle Map component
  toggleMap = () => {
    // console.log(`switch to ${checked}`);
    this.props.store.app.toggleIsMap();
    this.props.store.app.setIsSidebarOpen(false);
  };

  toggleGraph = () => {
    // console.log(`switch to ${checked}`);
    this.props.store.app.setIsGraph();
    this.props.store.app.setIsSidebarOpen(false);
  };

  render() {
    const { subject, isGraph, isMap } = this.props.store.app;
    return (
      <SideBarContent>
        <Box mb={2} style={{ textAlign: "center", letterSpacing: "1px" }}>
          <h3>
            <a
              style={{ color: "#B31B1B" }}
              href="http://www.cornell.edu/"
              target="_blank"
            >
              Cornell University
            </a>
          </h3>
        </Box>
        <hr />
        <br />
        <Subject size={this.props.size} />
        <State size={this.props.size} />
        <Station size={this.props.size} />

        <div>Date of Interest:</div>
        <DatePicker size={this.props.size} blossom={false} />

        <div>Strawberry Bloom Date:</div>
        <DatePicker size={this.props.size} blossom={true} />

        <div>Last fungicide application Date:</div>
        <DatePicker size={this.props.size} blossom={true} />

        <Box mb={2} mt={2}>
          <Button size="large" icon="environment-o" onClick={this.toggleMap}>
            {isMap ? "Hide Map" : "Display Map"}
          </Button>
        </Box>

        {subject.graph && (
          <Box>
            <Button size="large" icon="bar-chart" onClick={this.toggleGraph}>
              {isGraph ? "Hide Graph" : "Display Graph"}
            </Button>
          </Box>
        )}

        <Flex my={4} column>
          <h4>Botrytis Risk Levels</h4>
          <Flex my={1}>
            <RiskLevel color="#00A854">No Risk</RiskLevel>
            <Box ml={1}> &lt;0.5</Box>
          </Flex>
          <Flex my={1}>
            <RiskLevel color="#FFBF00">Moderate</RiskLevel>
            <Box ml={1}>&ge;0.5 and &lt;0.7</Box>
          </Flex>
          <Flex my={1}>
            <RiskLevel color="#F04134">High</RiskLevel>
            <Box ml={1}>&ge;0.7</Box>
          </Flex>
        </Flex>

        <Flex my={4} column>
          <h4>Anthracnose Risk Levels</h4>
          <Flex my={1}>
            <RiskLevel color="#00A854">No Risk</RiskLevel>
            <Box ml={1}>&lt;0.15</Box>
          </Flex>
          <Flex my={1}>
            <RiskLevel color="#FFBF00">Moderate</RiskLevel>
            <Box ml={1}>&ge;0.15 and &lt;0.5</Box>
          </Flex>
          <Flex my={1}>
            <RiskLevel color="#F04134">High</RiskLevel>
            <Box ml={1}>&ge;0.5</Box>
          </Flex>
        </Flex>

        <Acknowledgements />
        <MoreInfo />
      </SideBarContent>
    );
  }
}

export default SideBar;
