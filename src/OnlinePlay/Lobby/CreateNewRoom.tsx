import React, { FunctionComponent, useState } from "react";

import CreateNewRoomModal from "./CreateNewRoomModal";

const CreateNewRoom: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="createRoomButton"
        onClick={() => setShowModal(!showModal)}
      >{`New \n Room`}</button>
      {showModal ? (
        <CreateNewRoomModal setShowModal={setShowModal} showModal={showModal} />
      ) : null}
    </>
  );
};

export default CreateNewRoom;
