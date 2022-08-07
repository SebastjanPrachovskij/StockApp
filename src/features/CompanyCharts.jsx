import React, { useState } from "react";
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Legend,
  Export,
  Tooltip,
} from "devextreme-react/chart";
import "./CompanyCharts.scss";

const CompanyInfoTablet = ({ companyInformation, companyStocks }) => {
  const [enableChart, setEnableChart] = useState(false);
  const tableData = [];

  if (companyStocks.s === "ok") {
    for (let i = 0; i < companyStocks.o.length; i++) {
      tableData[i] = {
        o: companyStocks.o[i],
        h: companyStocks.h[i],
        c: companyStocks.c[i],
        l: companyStocks.l[i],
        t: new Date(companyStocks.t[i] * 1000).toLocaleDateString("en-US"),
      };
    }
  }

  return (
    <div>
      <table className="companyTable">
        <tbody>
          <tr className="companyTable__header">
            <th>Name</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Web URL</th>
          </tr>
          <tr className="companyTable__values">
            <td className="companyTable__name">
              <div role="button" onClick={(e) => setEnableChart(!enableChart)}>
                {companyInformation.name}
              </div>
            </td>
            <td className="companyTable__country">
              {companyInformation.country}
            </td>
            <td className="companyTable__currency">
              {companyInformation.currency}
            </td>
            <td className="companyTable__webURL">
              {companyInformation.weburl}
            </td>
          </tr>
        </tbody>
      </table>
      {enableChart && typeof companyInformation.name !== "undefined" ? (
        <Chart
          className="chart"
          title={companyInformation.name + " Stock Price"}
          dataSource={tableData}
        >
          <CommonSeriesSettings argumentField="date" type="candlestick" />
          <Series
            name={companyInformation.name}
            argumentField="t"
            openValueField="o"
            highValueField="h"
            lowValueField="l"
            closeValueField="c"
          >
            <Reduction color="red" />
          </Series>
          <ArgumentAxis workdaysOnly={false}>
            <Label format="shortDate" />
          </ArgumentAxis>
          <ValueAxis tickInterval={1}>
            <Title text={companyInformation.currency} />
            <Label>
              <Format precision={0} type="currency" />
            </Label>
          </ValueAxis>
          <Legend itemTextPosition="bottom" />
          <Export enabled={true} />
          <Tooltip enabled={true} location="edge" />
        </Chart>
      ) : null}
    </div>
  );
};

export default CompanyInfoTablet;
