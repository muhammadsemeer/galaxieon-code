import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Modal, List, Avatar, message } from "antd";
import { Instance, Template } from "../../types/templateAndInstance";
import axios from "../../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../../utils/Error";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import icons from "../../icons/icons";
import random from "random-words";
import { addOneInstance } from "../../store/instance/instanceSlice";
import styles from "./cmodal.module.scss";

export interface CreateModalProps {
  visible?: boolean;
  onCancel?: MouseEventHandler<HTMLElement>;
}

const CreateModal: FC<CreateModalProps> = ({ visible, onCancel }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const createInstance = (id: string) => {
    const loading = message.loading("Creating...", 0);
    axios
      .post(`/instance/create?template=${id}`, {
        name: random({ exactly: 3, join: "-" }),
      })
      .then((res: AxiosResponse<Instance>) => {
        loading();
        message.success("Instance Successfully Created");
        dispatch(addOneInstance(res.data));
        history.push(`/instance/editor/${res.data.id}`);
        onCancel && onCancel({} as MouseEvent<HTMLElement>);
      });
  };

  useEffect(() => {
    if (visible) {
      axios
        .get("/template")
        .then((res: AxiosResponse<Template[]>) => {
          setTemplates(
            res.data.sort(
              (a: Template, b: Template) =>
                (new Date(a.createdAt as string) as any) -
                (new Date(b.createdAt as string) as any)
            )
          );
        })
        .catch((err: AxiosError) => handleError(err, history, dispatch, false));
    }
  }, [visible]);

  return (
    <Modal
      title="Create Instance"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <List
        itemLayout="horizontal"
        dataSource={templates}
        grid={{
          column: 2,
          gutter: 15,
        }}
        renderItem={(item) => (
          <List.Item
            onClick={() => createInstance(item.id)}
            className={styles.listItem}
          >
            <List.Item.Meta
              avatar={<Avatar src={icons[item.name] || icons[item.language]} />}
              title={item.name}
              description={item.language}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CreateModal;
