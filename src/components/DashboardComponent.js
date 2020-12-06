import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import DoughnutChart from "./DoughnutChart";
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            data: []
        }
        this.getTokenAndData = this.getTokenAndData.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
    }

    componentDidMount() {
        this.getTokenAndData();
    }

    dateChangeFetchData(startDate, endDate) {
        // console.log(startDate)
        // console.log(endDate)
        if (startDate) {
            this.setState(prevState => ({
                ...prevState,
                startDate: startDate
            }), this.fetchUpdatedDate)
        }
        if (endDate) {
            this.setState(prevState => ({
                ...prevState,
                endDate: endDate
            }), this.fetchUpdatedDate)
        }
    }

    fetchUpdatedDate() {
        if (this.state.startDate && this.state.endDate) {
            this.getData(this.state.startDate + '', this.state.endDate + '');
        }
    }

    getTokenAndData() {
        let body = { email: "candidate@sigmoid.com", password: "Sigmoid#123", rememberMe: true };
        fetch("https://sigviewauth.sigmoid.io/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                let json = response.json();
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return json;
            }).then(res => {
                this.setState({ token: res });
                localStorage.setItem('token', this.state.token.token);
                this.getDateRange();

            })
            .catch(error => {
                alert("Something went wrong!");
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }

    getDateRange() {
        let body = { organization: "DemoTest", view: "Auction" };
        fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                let json = response.json();
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return json;
            }).then(res => {
                this.setState({ startDate: +res.result.startDate, endDate: +res.result.endDate })
                this.getData(res.result.startDate, res.result.endDate);
            })
            .catch(error => {
                alert("Something went wrong!");
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }

    getData(startDate, endDate) {
        let body = { "_id": "Datastory_ChartId_1535224664111", "emailId": "candidate@sigmoid.com", "orgViewReq": { "organization": "DemoTest", "view": "Auction" }, "chartObject": { "metadata": { "title": "", "img_thumbnail": "images/pie.png", "chartType": "pie", "dataLimit": 500 }, "text": [], "requestParam": { "granularity": "hour", "timeZone": { "name": "UTC (+00:00)", "location": "UTC" }, "dateRange": { "startDate": startDate, "endDate": endDate }, "xAxis": ["D005"], "yAxis": [], "approxCountDistinct": [], "specialCalculation": ["CM001"], "filter": [], "orderBy": { "customMetricOrdByList": [{ "id": "CM001", "desc": true }] }, "percentCalList": [{ "id": "CM001" }] } } };
        fetch("https://sigview.sigmoid.io/api/v1/getData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                let json = response.json();
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return json;
            }).then(res => {
                this.setState({ data: res.result.data });
            })
            .catch(error => {
                alert("Something went wrong!");
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }

    render() {
        let { startDate, endDate, data } = this.state;
        return (
            <div className="dashboard" >
                <h2>Data Analytics Application</h2>
                <div className="startdate">
                    <p>Start date:</p>
                    <DatePicker
                        minDate={startDate}
                        maxDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={date => this.dateChangeFetchData(date.getTime(), null)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                    />
                </div>
                <div className="enddate">
                    <p>End date:</p>
                    <DatePicker
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy"
                        maxDate={endDate}
                        selected={endDate}
                        onChange={date => this.dateChangeFetchData(null, date.getTime())}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                    />
                </div>
                <button className="reset" onClick={this.getDateRange}>Reset</button>
                <DoughnutChart data={data} />
            </div>
        );
    }
}

export default DashBoard;