import React, { FC } from "react";
import styles from "../styles/login.module.scss";
import { Card, Typography, Divider } from "antd";
import GoogleLogin from "react-google-login";
import LoginGithub from "react-login-github";

const { Title, Paragraph, Text } = Typography;

const Login: FC = () => {
  const handleSuccess = (resp: any) => {
    let token = resp.tokenId;
    console.log(token);
  };
  const handleFailure = (error: Error) => {
    console.log(error);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Login;
