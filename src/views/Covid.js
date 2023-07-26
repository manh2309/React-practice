import { useState, useEffect } from "react";
import useFetch from "../customize/fetch";
import moment from "moment/moment";
const Covid = () => {
  let toDay = moment().startOf("day").toISOString(true);
  let priorDate = moment()
    .startOf("day")
    .subtract(30, "days")
    .toISOString(true);
  const {
    data: datacovid,
    isLoading,
    isIsErr,
  } = useFetch(
    `https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${toDay}`,
    true
  );
  // const { datacovid: data, isLoading, isIsErr } = useFetch(
  //   `https://api.covid19api.com/country/vietnam?from=${beforeDate30}&to=${currentDate}`
  // );
  return (
    <>
      <h2>Covid 19 tracking in VietNam: </h2>
      <table>
        {console.log(">>>Check data", datacovid)}
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          {isLoading == false &&
            datacovid &&
            datacovid.length > 0 &&
            datacovid.map((item, index) => {
              return (
                <tr key={item.ID}>
                  <td>{index + 1}</td>
                  <td>{item.Date}</td>
                  <td>{item.Confirmed}</td>
                  <td>{item.Active}</td>
                  <td>{item.Deaths}</td>
                  <td>{item.Recovered}</td>
                </tr>
              );
            })}
          {isLoading == true && (
            <tr>
              <td colSpan={"6"} className="text-loading">
                Loading ...
              </td>
            </tr>
          )}
          {isIsErr == true && (
            <tr>
              <td colSpan={"6"} className="text-loading">
                Something wrong...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default Covid;
