import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  color: #fb4570;
  font-size: 24px;
`;

export default function Root(props) {
  const handleClick = (e) => {
    e.preventDefault();

    const event = new CustomEvent("CUSTOM_EVENT", {
      detail: {
        payload: { data: `some data about the event from app [${props.name}]` },
      },
    });
    // if (!typeof window !== "undefined") {
    console.log(
      `[${props.name}]: Dispatching event..`,
      event.type,
      event.detail.payload
    );
    window.dispatchEvent(event);
    // }
    alert(`[${props.name}]: The DISPATCH EVENT button was clicked. 

    >>> SEE console for details <<<`);
  };

  return (
    <StyledDiv>
      <h1>{props.name} is mounted with events!</h1>
      <button onClick={handleClick}>Dispatch Event</button>
    </StyledDiv>
  );
}
