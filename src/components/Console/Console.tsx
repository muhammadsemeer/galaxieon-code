import React, { useState } from "react";
import "./console.scss";
import { Tabs } from "antd";
import { DownOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Message from "./Message/Message";
import { Collapse } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Problem } from "../../store/editor/editor";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const { Text } = Typography;
function Console() {
  const [isConsoleCleared, setIsConsoleCleared] = useState(false);
  const [show, setShow] = useState(false);
  const [activeKey, setActiveKey] = useState("problems");
  const problems = useSelector((state: RootState) => state.editor.problems);

  return (
    <div className={`console_tabs ${show && "show"} `}>
      <Tabs
        defaultActiveKey={activeKey}
        onChange={(activeKey) => {
          setActiveKey(activeKey);
          setShow(true);
        }}
      >
        {/* <TabPane tab="Console" key="console">
          {isConsoleCleared && (
            <Text type="secondary" code className="clear_text">
              Console was cleared
            </Text>
          )}
          <Message
            type="log"
            location="App.js 13:90"
            txt={`function foo() { return 'bar' }`}
          />
          <Message
            type="error"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />{" "}
          <Message
            type="error"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />
          <Message
            type="warning"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />{" "}
          <Message
            type="warning"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />
          <Message
            type="info"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />{" "}
          <Message
            type="info"
            location="App.js 13:90"
            txt="ReferenceError : Hello is not defined"
          />
        </TabPane> */}
        <TabPane
          tab={`Problems ${problems.length > 0 ? "(" + problems.length + ")" : ""}`}
          key="problems"
          className="problems"
        >
          <Collapse defaultActiveKey={problems[0]?.file || ""} ghost>
            {problems.map((problem) => (
              <>
                <Panel
                  header={<Text>{problem.file}</Text>}
                  key={problem.file}
                  className="problems_panel"
                >
                  {problem.problems.map((item) => (
                    <Message
                      section="problems"
                      type="error"
                      location={`${problem.file} ${item.start}:${item.end}`}
                      txt={item.message}
                    />
                  ))}
                </Panel>
              </>
            ))}
          </Collapse>
        </TabPane>
      </Tabs>
      <div className="collapse_handler">
        {activeKey === "console" && <StopOutlined className="clear_icon" />}
        {show ? (
          <DownOutlined
            className="collapse_icon"
            onClick={() => setShow(!show)}
          />
        ) : (
          <UpOutlined
            className="collapse_icon"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </div>
  );
}

export default Console;
