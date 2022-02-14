import styled from "styled-components"

export const Header = styled.div`
display: flex;
flex-direction: row;
background: #3B2659;
padding: 20px;
justify-content: space-between;
position: sticky;
z-index: 10000;
top: 0;
`;

export const HeaderContent = styled.div`
display: flex;
flex-direction: row;
`;


export const Title = styled.p`
display: flex;
align-items: center;
margin-left: 20px;
font-size: 25px;
padding-top: 4px;
font-weight: 500;
color: #fff;
`;

export const Icon = styled.img`
width: 40px;
height: 40px;
`;
