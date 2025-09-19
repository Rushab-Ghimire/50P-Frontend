import React from "react";
import { AuthContext } from "./AuthContext";
import { eraseCookie, getCookie, setCookie } from "@jumbo/utilities/cookies";
import { postCall, getCall, gqlQuery } from "@app/_utilities/http";
import { useGoogleLogin } from "@react-oauth/google";
import { GLOBAL } from "@app/_utilities/globals";
import { getRoles } from "@app/_utilities/helpers";

let authToken = getCookie("auth-token");
let hasToken = false;
if (authToken) {
  hasToken = true;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(hasToken);
  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState({});

  const loginViaEmail = async ({ email }) => {
    setLoading(true);
    try {
      const response = await gqlQuery({
        signal: "authentication",
        path: "/graphql",
        inData: {
          gql: `mutation M {
                loginByEmail(email: "${email}") {
                  user {
                    email
                  }
                  token
                  refreshToken
                }
              }`,
        },
      });

      if (response.error) {
        return response;
      }

      if (response.token) {
        setCookie("auth-token", response.token, 1);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      setLoading(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const loginViaSMS = async ({ sms_code }) => {
    setLoading(true);
    try {
      const response = await gqlQuery({
        signal: "authentication",
        path: "/graphql",
        inData: {
          gql: `mutation M {
                loginByPhone(smsCode: "${sms_code}") {
                  user {
                    email
                  }
                  token
                  refreshToken
                }
              }`,
        },
      });

      if (response.error) {
        return response;
      }

      if (response.token) {
        setCookie("auth-token", response.token, 1);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      setLoading(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password, phone }) => {
    setIsLogin(true);
    try {
      const response = await gqlQuery({
        signal: "authentication",
        path: "/graphql",
        onError: (ex) => {
          throw ex;
        },
        inData: {
          gql:
            email === undefined
              ? `mutation M {
                tokenAuth(phone: "${phone}", password: "${password}") {
                  payload
                  token
                  refreshToken
                  refreshExpiresIn
                }
              }`
              : `mutation M {
                tokenAuth(email: "${email}", password: "${password}") {
                  payload
                  token
                  refreshToken
                  refreshExpiresIn
                }
              }`,
        },
      });

      if (response.token) {
        setCookie("auth-token", response.token, 1);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      setIsLogin(false);
      return error;
    } finally {
      setIsLogin(false);
    }
  };

  const loginWithGoogleAD = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await gqlQuery({
          signal: "authentication",
          path: "/graphql",
          inData: {
            gql: `mutation M {
                  loginBySocial(accessToken: "${codeResponse.access_token}", provider: "google", organizationId:${GLOBAL.google_organization_id}, roleIdentifier: "${GLOBAL.google_role}", referralCode: "${GLOBAL.referral_code}") {
                    token
                    refreshToken
                  }
                }`,
          },
        });

        if (response.token) {
          setCookie("auth-token", response.token, 1);
          setIsAuthenticated(true);
          window.open("/bridge", "_self");
          // return response;
        }
      } catch (error) {
        return error;
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      return error;
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await gqlQuery({
          signal: "authentication",
          path: "/graphql",
          inData: {
            gql: `mutation M {
                  loginBySocial(accessToken: "${codeResponse.access_token}", provider: "google") {
                    token
                    refreshToken
                  }
                }`,
          },
        });

        if (response.token) {
          setCookie("auth-token", response.token, 1);
          setIsAuthenticated(true);
          window.open("/bridge", "_self");
          // return response;
        }
      } catch (error) {
        return error;
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      return error;
    },
  });

  const logout = () => {
    eraseCookie("auth-token");
    setIsAuthenticated(false);
  };

  const getUserDetail = async () => {
    setLoading(true);
    const response = await gqlQuery({
      signal: "authentication",
      path: "/graphql",
      inData: {
        gql: `query MyQuery {
                whoami
              }`,
      },
    });
    if (response.error) {
      logout();
      window.open("/error/account-activation", "_self");
      return;
    }
    let userData = JSON.parse(response);

    if (userData.id) {
      const currentSubscription = await getCurrentSubscription();
      if (currentSubscription.id){
        userData["subscription"] = currentSubscription;
      }
      GLOBAL.userDetail = userData;
      if (getRoles(GLOBAL.userDetail.organizations).includes("sa")) {
        GLOBAL.isSA = true;
      }
      setUserDetail((prevUserData) => {
        return userData;
      });
      setIsAuthenticated(true)
      //console.log("New UD", GLOBAL.userDetail);
    }
    setLoading(false);
  };

  const getCurrentSubscription = async(update=false) => {
    try {
      const sub = await getCall({"path": "/subscription/current-subscription"});
      if(update && sub?.id){
        setUserDetail((prevUserData) => {return {...prevUserData, "subscription": sub}});
      }else{
        return sub;
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if(!isAuthenticated){
      setLoading(false);
      return;
    }
    getUserDetail();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        isLogin,
        userDetail,
        login,
        logout,
        getUserDetail,
        loginViaSMS,
        loginWithGoogle,
        loginWithGoogleAD,
        getCurrentSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
