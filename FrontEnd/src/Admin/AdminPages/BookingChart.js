import React, { Component } from "react";
import DrowChart from "react-apexcharts";
import BookingService from "../Services/BookingService";

class BookingChart extends Component {
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
        BookingService.getBookingDataForChart().then(res => {
            let op = {
                chart: {
                    id: "Booking Tracking "
                }, xaxis: { categories: res.data.result.monthList }
            };
            this.setState({ options: op });
            ser.push({ name: "Total Bookings", data: res.data.result.countList });
        });
        BookingService.getBookingDataForChartStatus("ACCEPTED").then(res => {
            ser.push({ name: "Accepted Bookings", data: res.data.result.countList })
        });
        BookingService.getBookingDataForChartStatus("PENDING").then(res => {
            ser.push({ name: "Pending Bookings", data: res.data.result.countList })
        });
        BookingService.getBookingDataForChartStatus("CANCELED").then(res => {
            ser.push({ name: "Cancel Bookings", data: res.data.result.countList })
        });
        BookingService.getBookingDataForChartStatus("PICKUPED_BY_CUSTOMER").then(res => {
            ser.push({ name: "Pickuped Bookings", data: res.data.result.countList })
        });
        BookingService.getBookingDataForChartStatus("RECIVED_AT_CENTER").then(res => {
            ser.push({ name: "Bookings recived at center", data: res.data.result.countList })
        });
        this.setState({ series: ser });

    }
    render() {
        return (
            // <div className="">
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
            // </div>
        );
    }
}

export default BookingChart;