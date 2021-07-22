import React, { FC, useState } from "react";
import styles from "../styles/user.login.module.scss";
import { Button, Card, Result, Spin } from "antd";
import { Typography } from "antd";
import GoogleLogin from "react-google-login";
import GitHubLogin from "react-login-github";
import Icons from "../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "../api/index";
import { AxiosError, AxiosResponse } from "axios";
import handleError from "../utils/Error";
import { logIn } from "../store/auth/authSlice";

// Typography
const { Title, Paragraph, Text } = Typography;

//icons
const { Google, Github } = Icons;

const UserLogin: FC = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [error, setError] = useState<{ status: any; message: string }>();
  const [isLoading, setLoading] = useState(false);

  const onSuccess = (response: any, type: "google" | "github") => {
    let token = response.tokenId || response.code;
    setLoading(true);
    axios
      .post(`/auth/${type}`, { token })
      .then((res: AxiosResponse) => {
        setLoading(false);
        dispatch(logIn(res.data));
        history.push("/dashboard");
      })
      .catch((error: AxiosError) => {
        handleError(error, history, dispatch, false);
      });
  };

  const onError = (error: any) => {
    setError({
      status: error.error?.status || "error",
      message: error.error?.message || "Something Went Wrong",
    });
  };

  auth.login && auth.user && history.push("/dashboard");

  return (
    <div className={styles.container}>
      <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
        {!error ? (
          <Card className={styles.card}>
            <Title level={3} className={styles.title}>
              Galaxieon <span className={styles.title2}>Code</span>
            </Title>
            <Paragraph className={styles.paragraph}>
              Bringing your
              <span className={styles.pBold}>Favorite Code Editor</span> to the
              <br />
              <span className={styles.pBold}>
                Super Powered World Of Web
              </span>{" "}
              ⚡️
            </Paragraph>

            {/* Github Auth */}
            <GitHubLogin
              className={styles.authButton}
              clientId={process.env.GITHUB_CLIENT_ID}
              onSuccess={(resp: any) => onSuccess(resp, "github")}
              onFailure={onError}
              buttonText={
                <div className={styles.center}>
                  {Github} Sign in with Github
                </div>
              }
            />

            {/* Google Auth */}

            <GoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID as string}
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
              onSuccess={(resp: any) => onSuccess(resp, "google")}
              onFailure={onError}
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
      </Spin>
    </div>
  );
};

export default UserLogin;
