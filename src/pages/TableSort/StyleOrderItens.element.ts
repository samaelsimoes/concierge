import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StraightIcon from '@mui/icons-material/Straight';

import styled from "styled-components";
import { Colors } from "../../globalStyles";


export const DescIcon = styled(StraightIcon)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;


export const AscIcon = styled(ArrowDownwardIcon)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;

export const Asc = styled(AiOutlineSortAscending)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;


export const Dsc = styled(AiOutlineSortDescending)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;