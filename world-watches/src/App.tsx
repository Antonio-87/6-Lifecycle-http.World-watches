import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Clock from "./components/Clock";

function App() {
  const [watches, setWatches] = useState<{ name: string; zone: string }[]>([]);

  const handlerSubmit = ({ name, zone }: { name: string; zone: string }) => {
    setWatches([...watches, { name, zone }]);
    console.log(watches);
  };

  return (
    <>
      <ul className="names-zone">
        {["New York", "Moscow", "London", "Tokyo"].map((elem, index) => {
          return (
            <>
              <li key={index}>{elem}</li>
              <br></br>
            </>
          );
        })}
      </ul>
      <Form handlerSubmit={handlerSubmit}></Form>
      <ul className="watches">
        {watches.map((watch, index) => {
          return (
            <li className="watch" key={index}>
              <Clock name={watch.name} timezone={parseInt(watch.zone)} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
