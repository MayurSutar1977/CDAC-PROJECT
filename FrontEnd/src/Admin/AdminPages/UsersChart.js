import React, { Component } from "react";
import DrowChart from "react-apexcharts";
import BookingService from "../Services/BookingService";
import UserServices from "../Services/UserServices";

class UsersChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }
    componentDidMount() {
        let ser = [];
        UserServices.getUsersDataForChart().then(res => {
            console.log(JSON.stringify(res))
            let op = {
                chart: {
                    id: "Booking Tracking "
                }, xaxis: { categories: res.data.result.monthList }
            };
            this.setState({ options: op });
            ser.push({ name: "Total User Registration", data: res.data.result.countList });
        });
        this.setState({ series: ser });

    }
    render() {
        return (
            <div className=" card">
                <div className="mixed-chart">
                    <DrowChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        // type="line"
                        // width="1160"
                        height="350"
                    />
                </div>
            </div>
        );
    }
}

export default UsersChart;