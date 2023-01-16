import { Button, ButtonProps } from "react-bootstrap";
import styled from "styled-components";
import { Colors } from "../../pages/Home/WhoAreWe.elements";

const StyledButton = styled(Button)`
  text-align: center;
  margin-top: 15px;
  /* width: 142px; */
  border-radius: 6px;
  background: ${props => props.variant === "primary" ? Colors.primary : "white"};
  white-space: nowrap;
  padding: 10px 21px;
  color: ${props => props.variant === "primary" ? "white" : Colors.primary};
  font-size: 15px;
  outline: none;
  border: 1px solid ${props => props.variant === "primary" ? "transparent" : Colors.primary};
  min-width: 142px;
  &:disabled {
    border: 1px solid #999999;
    background-color: #666666;
    color: #cccccc;
  }

  &:focus {
    background: ${props => props.variant === "primary" ? Colors.primary : "white"};
    border: 1px solid ${props => props.variant === "primary" ? "transparent" : Colors.primary};
    color: ${props => props.variant === "primary" ? "white" : Colors.primary};
    box-shadow: none;
  }

  &:hover {
    transition: all 0.3s ease-out;
    background: ${props => props.variant === "primary" ? "white" : Colors.primary};
    border: 1px solid ${props => props.variant === "primary" ? Colors.primary : "transparent"};
    color: ${props => props.variant === "primary" ? Colors.primary : "white"};
    min-width: 142px;
  }
  @media screen and (max-width: 960px) {
      min-width: 100%;
    }
  
`;

export default function FormButton(props: ButtonProps) {
  return (
    <StyledButton variant={props.variant || "primary"} style={props.style} {...props}>
      {props.children}
    </StyledButton>
    // <StyledButton variant={props.variant || "primary"} style={props.style}>
    //   {props.children}
    // </StyledButton>
  );
}
