import React, { InputHTMLAttributes } from 'react'
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const INPUTSearch = styled.input`
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 1.5rem 1.5rem 1.5rem 0rem;
  font-family: "Montserrat" !important;
  font-size: 100%;
  border: none;
  width: 100%;
  Height: 42px;
  Top: 773px;
  border: 1px solid rgba(73, 73, 73, 0.8);
`;

const IconSearch = styled.div`
display: inline-block;
font-size: 20px;
position: center;
margin-left: -50px;
`;

export default function InputSearch(props: React.HTMLProps<HTMLInputElement>) {
const { t } = useTranslation();
  return (
    <div>
        <INPUTSearch
          type="text"
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}          
        />
        <IconSearch><BsSearch /></IconSearch>
      </div>
  )
}