import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

function Jobs({ job }) {
  //   console.log(job);

  const [open, setOpen] = useState(false);
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2 p-1">
              {job.type}
            </Badge>
            <Badge variant="secondary" className="p-1">
              {job.location}
            </Badge>
            <div>
              <a href={job.company_url}>Click Here to Apply!</a>
            </div>
          </div>
          <img
            src={job.company_logo}
            alt="company logo"
            className="d-none d-md-block"
            height="50"
          />
        </div>
        <Card.Text>
          <Button
            variant="primary"
            className="mt-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default Jobs;
