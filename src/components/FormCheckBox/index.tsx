import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { Colors } from '../../globalStyles';


type CheckBoxProps = {
  label: string | React.ReactNode;
  checked: boolean;
  setChecked: Function;
};

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  all: unset;
  background-color: white;
  min-width: 25px;
  height: 25px;
  border-radius: 8px;
  border: 1px solid ${Colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px lightgray;
  &:hover { background-color: whitesmoke};
  /* &:focus { box-shadow: 0 0 0 2px black; }; */
`;

const CheckIconStyled = styled(FaCheck)`
  fill: ${Colors.primary};
  transition: display 3s;
`;

export const Checkbox = StyledCheckbox;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  color: gray;
  font-size: 15px;
  padding-left: 15px;
  line-height: 1.2;
  user-select: none;
  
`;

export const FormCheckBox = (props: CheckBoxProps) => {

  const [check, setCheck] = useState(props.checked)

  return (
    <form>
      <Flex>
        <Checkbox id="checkbox" onCheckedChange={() => {
          props.setChecked(!check);
          setCheck(!check);
        }} checked={check}>
          <CheckIconStyled display={check ? "block" : "none"}/>
        </Checkbox>
        <Label htmlFor="checkbox">
          {props.label}
        </Label>
      </Flex>
    </form>
  );
};
