import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

const Inputs = (props) => {

  const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            };
        default:
            return state;    
    }
  };    

  const [inputState, dispatch] = useReducer(inputReducer, {value: "", isValid: false});

  const changeHandler = event => {
        dispatch({type: CHANGE, val: event.target.value});
    }

   const element = props.element === 'input' ? (
        <Form.Control
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          value={inputState.value}
          className={`form-control ${!inputState.isValid ? "form-control-invalid" : ""}`}
        />
      ) : (
        <Form.Control
          as="textarea"
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          value={inputState.value}
          className={`form-control ${!inputState.isValid ? "form-control-invalid" : ""}`}
        />
      );

  return (
    <div>
      <Form>
        <Form.Group className="mb-3"> 
            <FloatingLabel htmlFor={props.id} label={props.label}>
                {element}
                {!inputState.isValid && <p>{props.errorText}</p>}
            </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Inputs;