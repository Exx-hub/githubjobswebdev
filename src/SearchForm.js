import React from "react";
import { Form, Col } from "react-bootstrap";

function SearchForm({ params, handleChange }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoComplete="off"
            onChange={handleChange}
            value={params.description || ""}
            type="text"
            name="description"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            autoComplete="off"
            onChange={handleChange}
            value={params.location || ""}
            type="text"
            name="location"
          />
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check
            onChange={handleChange}
            value={params.full_time}
            name="full_time"
            id="full-time"
            label="Full Time Only"
            type="checkbox"
            className="mb-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

export default SearchForm;
