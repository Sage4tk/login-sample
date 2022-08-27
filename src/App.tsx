import { useState } from "react";

//component
import Form from "./components/form/Form";
import Toaster from "./components/toaster/Toaster";

//styling
import "./index.scss";

//imgs
import bg from "./img/bg1.svg";

const App:React.FC = () => {
  //toaster infomation
  const [toaster, setToaster] = useState<any>(null);
  
  return (
    <>
    <div className="wrapper">
      <Form setToaster={setToaster} />
      {toaster && <Toaster message={toaster?.Message} backgroundColor={toaster?.Status} setToaster={setToaster} />}
      <img src={bg} className="bg tr" alt="" draggable="false" />
      <img src={bg} className="bg bl" alt="" draggable="false" />
    </div>
    </>
  )
}

export default App;
