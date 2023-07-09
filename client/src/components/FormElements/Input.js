import React, { useReducer, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { validate } from '../../utils/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <Form.Control
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`form-control ${!inputState.isValid ? 'form-control-invalid' : ''}`}
      />
    ) : (
      <Form.Control
        as="textarea"
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`form-control ${!inputState.isValid ? 'form-control-invalid' : ''}`}
      />
    );

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <FloatingLabel htmlFor={props.id} label={props.label}>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
          </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Input;