import React from 'react';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

const Inputs = (props) => {
  const element = props.element === 'input' ? (
    <Form.Control id={props.id} type={props.type} placeholder={props.placeholder} />
  ) : (
    <Form.Control as="textarea" id={props.id} rows={props.rows || 3} />
  );

  return (
    <div>
      <Form>
        <Form.Group className="mb-3"> 
            <FloatingLabel htmlFor={props.id} label={props.label}>
                {element}
            </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Inputs;