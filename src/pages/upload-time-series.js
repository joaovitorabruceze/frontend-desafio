import { Button, Fab, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Box, BoxItens, Graphs, SubTitle, Title } from "./upload-time-series.style";
import AddIcon from "@material-ui/icons/Add"
import Update from "@material-ui/icons/Update"
import ReactEcharts from "echarts-for-react";
import DenseTable from "../components/table/table";
import api from "../api/api";
import { Field, Form, Formik } from 'formik';

const UploadTimeSeries = () => {

    const [showGraphs, setShowGraphs] = useState(false);

    const [timeSeries, setTimeSeries] = useState([]);

    const initialValues = {
        file: null
    }

    const handleSubmit = async (data) => {
        console.log(data.file);
        try {
            timeSeries = await api.post("/process-csv-file", data.file.File);
        } catch (e) {

        }
    }

    const dates = [
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        },
        {
            "value": "15/12/2021"
        }
    ]
    const infected = [
        {
            "value": 600.58
        },
        {
            "value": 1100.58
        },
        {
            "value": 1200.58
        },
        {
            "value": 1300.58
        },
        {
            "value": 1400.58
        },
        {
            "value": 1500.58
        },
        {
            "value": 1500.58
        },
        {
            "value": 1600.58
        },
        {
            "value": 1800
        }
    ];
    const dead = [
        {
            "value": 620.58
        },
        {
            "value": 1150.58
        },
        {
            "value": 1250.58
        },
        {
            "value": 1350.58
        },
        {
            "value": 1450.58
        },
        {
            "value": 1550.58
        },
        {
            "value": 1550.58
        },
        {
            "value": 1650.58
        },
        {
            "value": 1850
        }
    ];

    const data = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                label: {
                    backgroundColor: "#6a7985"
                }
            }
        },
        legend: {
            data: ["Infected", "Dead"]
        },
        dataZoom: [
            {
                type: "slider",
                height: 8,
                bottom: 20,
                borderColor: "transparent",
                backgroundColor: "#e2e2e2",
                handleIcon:
                    "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: "#aaa"
                }
            },
            {
                type: "inside"
            }
        ],
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            data: dates,
            show: true,
            axisLabel: {
                color: "gray",
                fontWeight: "bold",
                rotate: 90,
                interval: 6
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                color: "gray",
                inside: true
            }
        },
        series: [
            {
                name: "Infected",
                type: "line",
                smooth: true,
                data: infected,
                symbol: "none",
                color: "#0000ff"
            },
            {
                name: "Dead",
                type: "line",
                smooth: true,
                data: dead,
                symbol: "none",
                color: "#FF4500"
            }
        ]
    };

    return (

        <Box>
            {!showGraphs &&
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}

                >
                    {({ submitForm, isSubmitting, setFieldValue }) => (
                        <Form>
                            <label htmlFor="file_input">
                                <BoxItens>
                                    <Title>Bem vindo ao analisador de séries temporais.</Title>
                                    <SubTitle>Por favor, escolha um arquivo .csv para ser analisado.</SubTitle>
                                    <input
                                        id="file_input"
                                        name="file"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            setFieldValue('file', event.currentTarget.files[0]);
                                            submitForm();
                                        }}
                                        multiple
                                    />
                                    <Fab variant="extended" component="span" size="small" style={{ textTransform: "none", background: "#3B2659", color: "#fff" }}>
                                        <AddIcon style={{ marginRight: "5px", color: "#fff" }} />
                                        Carregar arquivo .csv
                                    </Fab>
                                </BoxItens>

                            </label>
                        </Form>
                    )}


                </Formik>


            }
            <button onClick={() => setShowGraphs(true)}> oi</button>
            {
                showGraphs &&
                <Graphs>
                    <Title>Gráfico das séries temporais analisadas</Title>
                    <ReactEcharts
                        style={{
                            height: "400px",
                            width: "70%",
                            marginBottom: "50px"
                        }}
                        option={data}
                    />
                    <Title>Valores máximo e mínimo de cada série</Title>
                    <DenseTable />
                    <Fab
                        variant="extended"
                        component="span"
                        size="small"
                        style={{ textTransform: "none", background: "#3B2659", color: "#fff", marginTop: "30px" }}
                        onClick={() => setShowGraphs(false)}>

                        <Update style={{ marginRight: "5px", color: "#fff" }} />
                        Carregar novo arquivo .csv
                    </Fab>
                </Graphs>


            }

        </Box >

    );
}

export default UploadTimeSeries;