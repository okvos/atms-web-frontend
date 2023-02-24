import React, { useState } from "react";
import { SIZE } from "baseui/textarea";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { CommentSendButtonOverrides } from "./styled-components";
export function CommentCreate() {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <Input
        overrides={{
          Root: {
            style: {
              paddingRight: "0px",
            },
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size={SIZE.compact}
        placeholder="Add a comment"
        endEnhancer={() => (
          <Button
            kind={KIND.secondary}
            overrides={CommentSendButtonOverrides}
            size={SIZE.mini}
          >
            {value !== "" && "Share"}
          </Button>
        )}
      />
    </>
  );
}
