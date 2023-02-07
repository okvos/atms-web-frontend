import React, { MutableRefObject, useRef, useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { toast, useAuth } from "@atms-modules";
import { PutAuthenticateCreateRequest } from "@atms/api/request/authenticate/create";
import { APP_NAME } from "@atms-config/constants";
import { useNavigate } from "react-router-dom";

export function Create() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const auth = useAuth();

  const createAccount = async () => {
    setIsLoading(true);

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return toast("error", "Your passwords do not match");
    }

    let request = new PutAuthenticateCreateRequest({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
    try {
      let response = await request.execute();

      if (response && response.user) {
        auth.login(response.user.user_id, response.user.username);
        toast(
          "success",
          `Welcome to ${APP_NAME}, ${response.user.username}! Redirecting...`
        );
        navigate(`/profile/${response.user.username}`);
      }
    } catch (e: any) {
      setIsLoading(false);
      toast("error", e.message);
    }
  };

  return (
    <>
      <FormControl label="Username">
        <Input autoComplete="username" inputRef={usernameRef} />
      </FormControl>
      <FormControl label="Email Address">
        <Input autoComplete="email" inputRef={emailRef} type="email" />
      </FormControl>
      <FormControl label="Password">
        <Input
          type="password"
          autoComplete="new-password"
          inputRef={passwordRef}
        />
      </FormControl>
      <FormControl label="Confirm Password">
        <Input
          type="password"
          autoComplete="new-password"
          inputRef={confirmPasswordRef}
        />
      </FormControl>
      <Button
        onClick={createAccount}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Create Account
      </Button>
    </>
  );
}
