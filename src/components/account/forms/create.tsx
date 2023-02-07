import React, {
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { PutAuthenticateRequest } from "@atms/api/request/authenticate";
import { useAuth } from "@atms-modules";
import { toast } from "@atms-modules";

export function Create() {
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const auth = useAuth();

  const createAccount = async () => {
    setIsLoading(true);
  };

  return (
    <>
      <FormControl label="Username">
        <Input autoComplete="username" inputRef={usernameRef} />
      </FormControl>
      <FormControl label="Email Address">
        <Input autoComplete="email" inputRef={emailRef} />
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
