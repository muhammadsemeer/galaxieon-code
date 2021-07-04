import React, { FC, useState } from "react";
import styles from "../styles/login.module.scss";
import { Card, Typography, Divider, Result, Button } from "antd";
import GoogleLogin from "react-google-login";
import axois from "../api/index";
import { AxiosError, AxiosResponse } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/index";
import { logIn } from "../store/auth/authSlice";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Login: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [error, setError] = useState<{ status: any; message: string }>();
  const [isLoading, setLoading] = useState(false);

  const handleSuccess = (resp: any) => {
    let token = resp.tokenId;
    setLoading(true);
    axois
      .post("/auth/admin", { token })
      .then((res: AxiosResponse) => {
        dispatch(logIn(res.data));
        history.push("/admin");
      })
      .catch(({ response }: AxiosError) => {
        setError({
          status: response?.status.toString(),
          message: response?.data,
        });
        setLoading(false);
      });
  };
  const handleFailure = ({ error }: any) => {
    setError({ status: "error", message: error });
  };

  auth.login && auth.login && history.push("/admin");

  return (
    <div className={styles.container}>
      {!error ? (
        <Card className={styles.card}>
          {isLoading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          ) : (
            <>
              <Title level={2}>Galaxieon Code</Title>
              <Paragraph>
                Online Code Editor Super Powered By{" "}
                <Text strong> Galaxieon </Text>
              </Paragraph>
              <Divider />
              <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID as string}
                buttonText="Login With Google"
                accessType="online"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
              />
            </>
          )}
        </Card>
      ) : (
        <Result
          status={error.status}
          title={error.status}
          subTitle={error.message}
          extra={
            <Button type="primary" onClick={() => setError(undefined)}>
              Try Again
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Login;
