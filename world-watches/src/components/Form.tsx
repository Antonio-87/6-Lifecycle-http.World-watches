import { useRef, useState } from "react";

const Form = ({
  handlerSubmit,
}: {
  handlerSubmit: ({ name: string, zone: string }) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const componentInputName = useRef<HTMLInputElement>(null);
  const componentInputZone = useRef<HTMLInputElement>(null);

  const onHandlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name !== "" && zone !== "") handlerSubmit({ name, zone });

    if (componentInputName.current) {
      componentInputName.current.value = "";
      setName("");
    }
    if (componentInputZone.current) {
      componentInputZone.current.value = "";
      setZone("");
    }
  };

  return (
    <form onSubmit={onHandlerSubmit} className="form" name="form">
      <div className="input-box">
        <label htmlFor="zone-name">Название</label>
        <input
          type="text"
          id="zone-name"
          defaultValue={name}
          ref={componentInputName}
        />
      </div>
      <div className="input-box">
        <label htmlFor="time-zone">Временная зона</label>
        <input
          type="text"
          id="time-zone"
          defaultValue={zone}
          ref={componentInputZone}
        />
      </div>
      <input type="button" value="Добавить" />
    </form>
  );
};

export default Form;
