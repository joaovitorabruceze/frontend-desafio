import React from "react";
import { Header, HeaderContent, Icon, Title } from "./layout.style";
import GraphIcon from "../../assets/line-chart.png"
import GitIcon from "../../assets/github.png"
import Linkedin from "../../assets/linkedin.png"
import { Link } from "react-router-dom";

const Layout = () => {
    return (
        <Header>
            <HeaderContent>
                <Icon src={GraphIcon} />
                <Title>Analisador de Séries Temporais</Title>
            </HeaderContent>
            <HeaderContent>
                <Icon src={GitIcon} onClick={() => window.open("https://github.com/joaovitorabruceze")} style={{ cursor: "pointer" }} />
                <Icon src={Linkedin} style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => window.open("https://www.linkedin.com/in/jo%C3%A3o-vitor-abruceze-senna-57aa30228/")} />
            </HeaderContent>
        </Header>
    );
}

export default Layout;