import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Clock from "./components/Clock";
import listCiti from "./assets/listCiti";

function App() {
  const [watches, setWatches] = useState<{ name: string; zone: string }[]>([]);

  const handlerSubmit = ({ name, zone }: { name: string; zone: string }) => {
    setWatches([...watches, { name, zone }]);
  };
  const handlerClick = (elementDelete: string) => {
    const updateWatches = watches.filter(
      (elem) => elem.name !== JSON.parse(elementDelete)
    );
    setWatches(updateWatches);
  };

  return (
    <>
      <ul className="names-zone">
        {listCiti.map((elem, index) => {
          return (
            <React.Fragment key={index}>
              <li>{elem}</li>
              <br></br>
            </React.Fragment>
          );
        })}
      </ul>
      <Form handlerSubmit={handlerSubmit}></Form>
      <ul className="watches">
        {watches.map((watch, index) => {
          return (
            <li className="watch" key={index}>
              <Clock
                name={watch.name}
                timezone={parseInt(watch.zone)}
                handlerClick={handlerClick}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
