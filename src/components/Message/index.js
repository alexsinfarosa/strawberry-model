import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Table from "antd/lib/table";
import "antd/lib/table/style/css";

@inject("store")
@observer
export default class Message extends Component {
  render() {
    const { mobile } = this.props;

    const data = [
      {
        disease: "Botrytis",
        message:
          "Disease management messages will appear here when the strawberry diseases model is in NEWA"
      },
      {
        disease: "Anthracnose",
        message:
          "Disease management messages will appear here when the strawberry diseases model is in NEWA"
      }
    ];
    const columns = [
      {
        title: "Disease",
        dataIndex: "disease",
        key: "disease",
        className: "table"
        // render: date => forecastText(date)
      },

      {
        title: "Disease Management",
        dataIndex: "message",
        key: "message",
        className: "table"
      }
    ];

    return (
      <div>
        <Table
          bordered
          size={mobile ? "small" : "middle"}
          columns={columns}
          rowKey={record => record.disease}
          pagination={false}
          dataSource={data}
          // expandedRowRender={record => description(record)}
        />
      </div>
    );
  }
}
