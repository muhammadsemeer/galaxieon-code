import React, { FC } from "react";
import styles from "../styles/user.login.module.scss";
import { Card } from "antd";
import { Typography } from "antd";
import GoogleLogin from "react-google-login";
import GitHubLogin from "react-login-github";
import Icons from "../icons/icons";

// Typography
const { Title, Paragraph, Text } = Typography;

//icons
const { Google, Github } = Icons;

const UserLogin: FC = (): JSX.Element => {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          Galaxieon <span className={styles.title2}>Code</span>
        </Title>
        <Paragraph className={styles.paragraph}>
          Bringing your{" "}
          <span className={styles.pBold}>Favorite Code Editor</span> to the
          <br />
          <span className={styles.pBold}>Super Powered World Of Web</span> ⚡️
        </Paragraph>

        {/* Github Auth */}
        <GitHubLogin
          className={styles.authButton}
          buttonText={
            <div className={styles.center}>{Github} Sign in with Github</div>
          }
        />

        {/* Google Auth */}

        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className={styles.authButton}
              disabled={renderProps.disabled}
            >
              {Google} Sign in with Google
            </button>
          )}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div style={{ marginTop: "30px" }}>
          <Text className={styles.text}>
            By continuing, you agree to Galaxieon Code <br />{" "}
            <Text underline className={styles.text}>
              {" "}
              Terms of Service, Privacy Policy
            </Text>
          </Text>
        </div>
      </Card>
      
    </div>
  );
};

export default UserLogin;
