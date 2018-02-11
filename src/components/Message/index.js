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
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem hic asperiores, excepturi deserunt quia aperiam est quibusdam animi voluptate reiciendis nobis velit provident blanditiis tempora repudiandae officiis accusamus commodi recusandae."
      },
      {
        disease: "Anthracnose",
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sint officia nostrum nihil in aspernatur aperiam dolorem, quas dolores qui aliquam odit non consequuntur perferendis eaque, molestiae, dolor assumenda iste"
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
