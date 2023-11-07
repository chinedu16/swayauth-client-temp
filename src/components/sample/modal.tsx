import { useState } from "react";
import Modal from "../modal";

const ModalSample = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return <div>
    <button onClick={toggle}>togle modal</button>
    <Modal isOpen={show} toggle={toggle} className="">
      <div className="mx-auto max-w-2xl bg-white transition">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nulla dicta assumenda nam sed dolores a ipsa magnam voluptas.
        Nesciunt minima dolores quas quibusdam excepturi voluptates
        inventore ea voluptatem commodi exercitationem.
      </div>
    </Modal>
  </div>;
};

export default ModalSample;
