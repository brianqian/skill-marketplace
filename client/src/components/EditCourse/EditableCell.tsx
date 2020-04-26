import React, { useState, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components/macro';
import CategoryDropdown from '../CategoryDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const Container = styled.div`
  width: fit-content;
  justify-self: flex-start;
`;

const Text = styled.p<{ editable: boolean }>`
  width: fit-content;
  padding: 0.25rem;
  border-radius: 5px;
  :hover {
    ${p => (p.editable ? 'background-color: darkgray' : '')};
  }
`;

type Props = {
  enabled: boolean;
  defaultValue: string | number;
  isCategory?: boolean;
  name: string;
};

type InputSelectRef = React.Ref<HTMLSelectElement | HTMLInputElement>;
type InputSelectProps = { isDropdown: boolean; defaultValue: string | number; name: string };
//  'enabled' props allows:
// - highlight-on-hover effect
// - change cell to input on click

// 'isInput' tracks input vs 'p' state

// Text is plain paragraph unless Cell is enabled
// When cell is enabled, Text has hover effect and can turn into input

const InputOrDropdown = React.forwardRef((props: InputSelectProps, ref: InputSelectRef) => {
  const { isDropdown, defaultValue } = props;
  if (isDropdown) {
    return <CategoryDropdown ref={ref as React.Ref<HTMLSelectElement>} name={props.name} />;
  }
  return (
    <input
      defaultValue={defaultValue}
      type="text"
      ref={ref as React.Ref<HTMLInputElement>}
      name={props.name}
    />
  );
});

const EditableCell = React.forwardRef((props: Props, ref: InputSelectRef) => {
  const { enabled, defaultValue, isCategory } = props;
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsInput(false);
    }
  }, [enabled]);

  const handleClick = (e: SyntheticEvent) => {
    if (!enabled) return;
    e.stopPropagation();
    setIsInput(true);
  };

  return (
    <Container onClick={handleClick}>
      {isInput ? (
        <InputOrDropdown
          isDropdown={!!isCategory}
          name={props.name}
          defaultValue={defaultValue}
          ref={ref}
        />
      ) : (
        <Text editable={enabled}>{defaultValue}</Text>
      )}
    </Container>
  );
});

export default EditableCell;
