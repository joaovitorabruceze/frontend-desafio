import { Fab } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import React, { useState } from "react";
import {
    Box,
    BoxItens,
    Graphs,
    SubTitle,
    Title,
} from "./upload-time-series.style";
import AddIcon from "@material-ui/icons/Add";
import Update from "@material-ui/icons/Update";
import ReactEcharts from "echarts-for-react";
import DenseTable from "../components/table/table";
import api from "../api/api";
import { Form, Formik } from "formik";

const UploadTimeSeries = () => {
    const [showGraphs, setShowGraphs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [datess, setDates] = useState([]);
    const [serie1, setSerie1] = useState([]);
    const [serie2, setSerie2] = useState([]);
    const [serie3, setSerie3] = useState([]);
    const [name, setName] = useState([]);

    const initialValues = {
        file: null,
    };

    const handleSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file);
        setLoading(true);
        try {
            const response = await api.post("/process-csv-file", formData);
            const response2 = await api.post("/get-name-file", formData);
            dataForChart(response.data, response2.data);
            setShowGraphs(true);
            setLoading(false);
        } catch (e) { }
    };

    const dataForChart = (data, data2) => {
        data.map(
            (e) => (
                setDates((prevArray) => [...prevArray, e.date]),
                setSerie1((prevArray) => [...prevArray, e.serie1]),
                setSerie2((prevArray) => [...prevArray, e.serie2]),
                setSerie3((prevArray) => [...prevArray, e.serie3])
            )
        );
        setName(data2);
    };

    const data = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: [name[1], name[2], name[3]],
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
                    shadowColor: "#aaa",
                },
            },
            {
                type: "inside",
            },
        ],
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: datess,
            show: true,
            axisLabel: {
                color: "gray",
                fontWeight: "bold",
                rotate: 90,
                interval: 6,
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                color: "gray",
                inside: true,
            },
        },
        series: [
            {
                name: name[1],
                type: "line",
                smooth: true,
                data: serie1,
                symbol: "none",
                color: "#0000ff",
            },
            {
                name: name[2],
                type: "line",
                smooth: true,
                data: serie2,
                symbol: "none",
                color: "#FF4500",
            },

            {
                name: name[3],
                type: "line",
                smooth: true,
                data: serie3,
                symbol: "none",
                color: "#f7d917",
            },
        ],
    };

    return (
        <Box>
            {!showGraphs && (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ submitForm, isSubmitting, setFieldValue }) => (
                        <Form>
                            <label htmlFor="file_input">
                                <BoxItens>
                                    <Title>Bem vindo ao analisador de séries temporais.</Title>
                                    <SubTitle>
                                        Por favor, escolha um arquivo .csv para ser analisado.
                                    </SubTitle>
                                    <input
                                        id="file_input"
                                        name="file"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            setFieldValue("file", event.currentTarget.files[0]);
                                            submitForm();
                                        }}
                                        multiple
                                    />
                                    <Fab
                                        variant="extended"
                                        component="span"
                                        size="small"
                                        style={{
                                            textTransform: "none",
                                            background: "#3B2659",
                                            color: "#fff",
                                        }}
                                    >
                                        <AddIcon style={{ marginRight: "5px", color: "#fff" }} />
                                        Carregar arquivo .csv
                                    </Fab>
                                </BoxItens>
                            </label>
                        </Form>
                    )}
                </Formik>
            )}
            {loading ? (
                <div style={{ marginTop: "40px" }}>
                    <TailSpin color="#3B2659" height={80} width={80} />
                </div>
            ) : (
                <>
                    {showGraphs && (
                        <Graphs>
                            <Title>Gráfico das séries temporais analisadas</Title>
                            <ReactEcharts
                                style={{
                                    height: "400px",
                                    width: "70%",
                                    marginBottom: "50px",
                                }}
                                option={data}
                            />
                            <Title>Valores máximo e mínimo de cada série</Title>
                            <DenseTable serie1={serie1} serie2={serie2} serie3={serie3} names={name} />
                            <Fab
                                variant="extended"
                                component="span"
                                size="small"
                                style={{
                                    textTransform: "none",
                                    background: "#3B2659",
                                    color: "#fff",
                                    marginTop: "30px",
                                }}
                                onClick={() => window.location.reload()}
                            >
                                <Update style={{ marginRight: "5px", color: "#fff" }} />
                                Carregar novo arquivo .csv
                            </Fab>
                        </Graphs>
                    )}
                </>
            )}
        </Box>
    );
};

export default UploadTimeSeries;