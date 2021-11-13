import React, { useState } from "react";
import "./console.scss";
import { Tabs } from "antd";
import { DownOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Message from "./Message/Message";
import { Collapse } from "antd";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const { Text } = Typography;
function Console() {
  const [isConsoleCleared, setIsConsoleCleared] = useState(true);
  const [show, setShow] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div className={`console_tabs ${show && "show"} `}>
      <Tabs
        defaultActiveKey={activeKey}
        onChange={() => {
          setActiveKey(activeKey === "1" ? "1" : "2");
          setShow(true);
        }}
      >
        <TabPane tab="Console" key="1">
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
        </TabPane>
        <TabPane tab="Problems" key="2" className="problems">
          <Collapse defaultActiveKey={["1"]} ghost>
            {/**Problem 1 */}
            <Panel
              header={<Text>/src/App.js</Text>}
              key="1"
              className="problems_panel"
            >
              <Message
                section="problems"
                type="error"
                location="browser"
                txt="ReferenceError : Hello is not defined"
              />
              <Message
                section="problems"
                type="warning"
                location="browser"
                txt="ReferenceError : Hello is not defined"
              />{" "}
              <Message
                section="problems"
                type="info"
                location="browser"
                txt="ReferenceError : Hello is not defined"
              />
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
      <div className="collapse_handler">
        {activeKey === "1" && <StopOutlined className="clear_icon" />}
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
