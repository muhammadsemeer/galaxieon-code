import React, { FC, useState } from "react";
import styles from "../styles/login.module.scss";
import { Card, Typography, Divider, Result, Button, ResultProps } from "antd";
import GoogleLogin from "react-google-login";
import axois from "../api/index";
import { AxiosError, AxiosResponse } from "axios";

const { Title, Paragraph, Text } = Typography;

const Login: FC = () => {
  const [error, setError] = useState<{ status: any; message: string }>();

  const handleSuccess = (resp: any) => {
    let token = resp.tokenId;
    axois
      .post("/auth/admin", { token })
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch(({ response }: AxiosError) =>
        setError({
          status: response?.status.toString(),
          message: response?.data,
        })
      );
  };
  const handleFailure = ({ error }: any) => {
    setError({ status: "error", message: error });
  };

  return (
    <div className={styles.container}>
      {!error ? (
        <Card className={styles.card}>
          <Title level={2}>Galaxieon Code</Title>
          <Paragraph>
            Online Code Editor Super Powered By <Text strong> Galaxieon </Text>
          </Paragraph>
          <Divider />
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID as string}
            buttonText="Login With Google"
            accessType="online"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
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
