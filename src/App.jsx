import { useEffect, useState } from "react";
import "./App.css";
import FamilyTree from "./FamilyTree";
import Tab from "./Tab";
import Tree from "./Tree";
import {
  familyData1,
  familyData2,
  familyData3,
  familyData4,
} from "./familyData";
import { MdArrowBack } from "react-icons/md";
import MobileView from "./MobileView";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const [data, SetData] = useState(familyData1);

  useEffect(() => {
    if (activeTab == "tab1") {
      SetData(familyData1);
    } else if (activeTab == "tab2") {
      SetData(familyData2);
    } else if (activeTab == "tab3") {
      SetData(familyData3);
    } else if (activeTab == "tab4") {
      SetData(familyData4);
    }
  }, [activeTab]);

  return (
    <>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* web - view  */}
      <div className=" hidden md:block">
        <FamilyTree actualData={data} activeTab={activeTab} />
      </div>
      {/* web - view  */}

      {/* mobile - view  */}
      <div className=" md:hidden">
      <MobileView familyData={data} />
      </div>
      {/* mobile - view  */}
    </>
  );
}

export default App;
