import React, { SyntheticEvent, useRef, useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import {
  AuthenticateRequest,
  AuthenticateResponse,
} from "../../util/api/models/Authenticate";
import { toast } from "../notifications/toast";

export function SignInForm(props: any) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const signInUser = async (e: SyntheticEvent) => {
    console.log(usernameRef.current.value);
    setIsLoggingIn(true);

    let request = new AuthenticateRequest({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    try {
      let response: AuthenticateResponse = await request.execute();
    } catch (e: any) {
      setIsLoggingIn(false);
      toast("error", e.message);
    }
  };

  return (
    <>
      <FormControl label="Username">
        <Input autoComplete="username" inputRef={usernameRef} />
      </FormControl>
      <FormControl label="Password">
        <Input
          type="password"
          autoComplete="current-password"
          inputRef={passwordRef}
        />
      </FormControl>
      <Button
        onClick={signInUser}
        isLoading={isLoggingIn}
        disabled={isLoggingIn}
      >
        Sign In
      </Button>
    </>
  );
}
