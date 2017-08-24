import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";

import takeRight from "lodash/takeRight";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isWithinRange from "date-fns/is_within_range";
import  IconNewa  from "components/newa-logo.svg";
//  reflexbox
import { Flex, Box, Heading } from "rebass";

// styles
import "styles/shared.styl";

// styled components
import { Value, Info, CSVButton, A } from "./styles";

import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";
import Spin from "antd/lib/spin";
import "antd/lib/spin/style/css";

import { leafWetnessAndTemps, botrytisModel, anthracnoseModel } from "utils";

@inject("store")
@observer
export default class Strawberry extends Component {
  constructor(props) {
    super(props);
    autorun(() => this.createDataModel());
  }

  createDataModel = () => {
    const { ACISData, currentYear, startDateYear } = this.props.store.app;

    for (const day of ACISData) {
      // Returns an object {W: Int, T: Int}
      const W_and_T = leafWetnessAndTemps(day, currentYear, startDateYear);

      let indexBotrytis = botrytisModel(W_and_T);
      if (indexBotrytis === "NaN") {
        indexBotrytis = "No Data";
      }
      let indexAnthracnose = anthracnoseModel(W_and_T);
      if (indexAnthracnose === "NaN") {
        indexAnthracnose = "No Data";
      }

      // setup botrytis risk level
      let botrytis = { index: indexBotrytis };
      if (indexBotrytis !== "No Data") {
        if (indexBotrytis < 0.5) {
          botrytis["riskLevel"] = "Low";
          botrytis["color"] = "#00A854";
        } else if (indexBotrytis >= 0.5 && indexBotrytis < 0.7) {
          botrytis["riskLevel"] = "Moderate";
          botrytis["color"] = "#FFBF00";
        } else {
          botrytis["riskLevel"] = "High";
          botrytis["color"] = "#F04134";
        }
      }

      // setup anthracnose risk level
      let anthracnose = { index: indexAnthracnose };
      if (indexAnthracnose !== "No Data") {
        if (indexAnthracnose < 0.5) {
          anthracnose["riskLevel"] = "Low";
          anthracnose["color"] = "#00A854";
        } else if (indexAnthracnose >= 0.5 && indexAnthracnose < 0.7) {
          anthracnose["riskLevel"] = "Moderate";
          anthracnose["color"] = "#FFBF00";
        } else {
          anthracnose["riskLevel"] = "High";
          anthracnose["color"] = "#F04134";
        }
      }

      let date = day.dateTable;
      this.props.store.app.setStrawberries({ date, botrytis, anthracnose });
    }
  };

  rowColor = idx => {
    if (idx > 2) {
      return "forecast";
    } else {
      return "past";
    }
  };

  render() {
    const {
      ACISData,
      station,
      areRequiredFieldsSet,
      isGraph,
      displayPlusButton,
      state,
      isLoading,
      endDate,
      currentYear,
      startDateYear,
      strawberries
    } = this.props.store.app;
    const { mobile } = this.props;

    // To display the 'forecast text' and style the cell
    const forecastText = date => {
      return (
        <Flex justify="center" align="center" column>
          <Value>
            {format(date, "MMM D")}
          </Value>
          {startDateYear === currentYear &&
            isAfter(date, endDate) &&
            <Info style={{ color: "#4D3919" }}>Forecast</Info>}
        </Flex>
      );
    };

    const description = record => {
      if (record.missingDays.length > 0) {
        return (
          <Flex style={{ fontSize: ".6rem" }} column>
            <Box col={12} lg={6} md={6} sm={12}>
              <Box col={12} lg={12} md={12} sm={12}>
                {record.missingDays.length > 1
                  ? <div>
                      No data available for the following{" "}
                      {record.cumulativeMissingDays} dates:{" "}
                    </div>
                  : <div>No data available for the following date:</div>}
              </Box>
            </Box>
            <br />
            <Box col={12} lg={6} md={6} sm={12}>
              {record.missingDays.map((date, i) =>
                <div key={i}>
                  - {date}
                </div>
              )}
            </Box>
          </Flex>
        );
      }
      return null;
    };

    const riskLevel = (text, record, i) => {
      // console.log(text, record, i);
      return (
        <Flex justify="center" align="center" column>
          <Value mb={1} style={{ color: record.color }}>
            {text}
          </Value>
          <Info style={{ background: record.color }}>
            {record.riskLevel}
          </Info>
        </Flex>
      );
    };

    const columns = [
      {
        title: "Date",
        width: "30%",
        dataIndex: "date",
        key: "date",
        className: "table",
        render: date => forecastText(date)
      },
      {
        title: "Index & Risk Levels",
        children: [
          {
            title: "Botrytis",
            width: "35%",
            className: "table",
            dataIndex: "botrytis.index",
            key: "botrytis",
            render: (text, record, i) => riskLevel(text, record.botrytis, i)
          },
          {
            title: "Anthracnose",
            width: "35%",
            className: "table",
            dataIndex: "anthracnose.index",
            key: "anthracnose",
            render: (text, record, i) => riskLevel(text, record.anthracnose, i)
          }
        ]
      }
    ];

    return (
      <Flex column align="center">
        <Box w={["100%", "90%", "90%"]}>
          <Heading fontSize={[3, 3, 4]}>
            <i>Strawberry</i> results for {" "}
            <span style={{ color: "#4c4177" }}>
              {station.name}, {state.postalCode}
            </span>
          </Heading>

          <Flex column>
            <Flex>
              <Box mt={1} w={["100%", "90%", "90%"]}>
                {displayPlusButton
                  ? <Table
                      bordered
                      size={mobile ? "small" : "middle"}
                      columns={columns}
                      rowKey={record => record.date}
                      loading={ACISData.length === 0}
                      pagination={false}
                      dataSource={
                        areRequiredFieldsSet
                          ? takeRight(strawberries, 8).map(day => day)
                          : null
                      }
                      expandedRowRender={record => description(record)}
                    />
                  : <Table
                      // rowClassName={(rec, idx) => this.rowColor(idx)}
                      bordered
                      size="middle"
                      columns={columns}
                      rowKey={record => record.date}
                      loading={ACISData.length === 0}
                      pagination={false}
                      dataSource={
                        areRequiredFieldsSet
                          ? takeRight(strawberries, 8).map(day => day)
                          : null
                      }
                    />}
              </Box>
            </Flex>

            <Flex
              my={2}
              justify="space-between"
              align="baseline"
              w={["100%", "90%", "90%"]}
            >
              <Box>NA - not available</Box>

              <Box>
                <A
                  target="_blank"
                  href={`http://forecast.weather.gov/MapClick.php?textField1=${station.lat}&textField2=${station.lon}`}
                >
                  {" "}Forecast Details
                </A>
              </Box>
            </Flex>

            <Flex my={2} column>
              <Box w={["100%", "90%", "90%"]}>
                <i>
                  <em style={{ color: "black" }}>
                    Disclaimer: These are theoretical predictions and forecasts.
                  </em>
                  The theoretical models predicting pest development or disease
                  risk use the weather data collected (or forecasted) from the
                  weather station location. These results should not be
                  substituted for actual observations of plant growth stage,
                  pest presence, and disease occurrence determined through
                  scouting or insect pheromone traps.
                </i>
              </Box>
              <Box w={["100%", "90%", "90%"]} justify="center">
                <img
                  src={IconNewa}
                  alt="Newa Logo"
                  style={{
                    width: "60px",
                    height: "60px"
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Box w={["100%", "90%", "90%"]}>
          {/* {isGraph && <Graph />} */}
        </Box>
      </Flex>
    );
  }
}
