import React from "react";
import { SignInForm } from "../../modules";
import { Heading, HeadingLevel } from "baseui/heading";
import { BEHAVIOR, Cell, Grid } from "baseui/layout-grid";

export default function SignIn() {
  return (
    <>
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={6}>
          <HeadingLevel>
            <Heading>Sign in</Heading>
            <hr />
            <SignInForm />
          </HeadingLevel>
        </Cell>
      </Grid>
    </>
  );
}
