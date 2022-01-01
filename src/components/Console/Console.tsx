import React, { useEffect, useRef, useState } from "react";
import "./console.scss";
import { Tabs } from "antd";
import { DownOutlined, StopOutlined, UpOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Message from "./Message/Message";
import { Collapse } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const { Text } = Typography;
function Console() {
  const [isConsoleCleared, setIsConsoleCleared] = useState(false);
  const [show, setShow] = useState(false);
  const [activeKey, setActiveKey] = useState("console");
  const problems = useSelector((state: RootState) => state.editor.problems);
  const { id } = useParams<{ id: string }>();
  const [consoles, setConsoles] = useState<{ type: string; message: any }[]>(
    []
  );

  const { current: socket } = useRef(
    io(`${process.env.SOCKET_ENDPOINT}/console`, {
      withCredentials: true,
    })
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("join", `editor_${id}`);
      ["log", "error", "warn", "info"].forEach((type) => {
        socket.on(`console.${type}`, (data) => {
          setConsoles((consoles) => [
            ...consoles,
            { type, message: JSON.stringify(data, null, 4) },
          ]);
        });
      });
    });
  }, []);

  return (
    <div className={`console_tabs ${show && "show"} `}>
      <Tabs
        defaultActiveKey={activeKey}
        onChange={(activeKey) => {
          setActiveKey(activeKey);
          setShow(true);
        }}
      >
        <TabPane tab="Console" key="console">
          {isConsoleCleared && (
            <Text type="secondary" code className="clear_text">
              Console was cleared
            </Text>
          )}
          {consoles.map(({ type, message }) => (
            <Message key={nanoid()} type={type} txt={message} />
          ))}
        </TabPane>
        <TabPane
          tab={`Problems ${
            problems.length > 0 ? "(" + problems.length + ")" : ""
          }`}
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
