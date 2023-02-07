import React from "react";
import { SignInForm, Create } from "./forms";
import { BEHAVIOR, Cell, Grid } from "baseui/layout-grid";
import {HeadingLarge} from "baseui/typography";

export default function Account() {
  return (
    <>
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={[12, 12, 6]}>
          <HeadingLarge>Sign in</HeadingLarge>
            <hr />
            <SignInForm />
        </Cell>
        <Cell span={[12, 12, 6]}>
          <HeadingLarge>Create an Account</HeadingLarge>
          <hr />
          <Create />
        </Cell>
      </Grid>
    </>
  );
}
