import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from "baseui/modal";
import { Button, KIND, SHAPE, SIZE as BUTTON_SIZE } from "baseui/button";
import React, { useState } from "react";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { FileUploader } from "baseui/file-uploader";

export function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");

  async function saveChanges() {
    console.log(updatedBio, updatedDisplayName);
  }

  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <FormControl
            label="Display Name"
            caption="What do you want to be called?"
          >
            <Input
              onChange={(e) => setUpdatedDisplayName(e.target.value)}
              placeholder="Display name"
              clearOnEscape
            />
          </FormControl>

          <FormControl label="Bio" caption="Describe yourself!">
            <Input
              onChange={(e) => setUpdatedBio(e.target.value)}
              placeholder="Bio"
              clearOnEscape
            />
          </FormControl>

          <FormControl label="Header Image">
            <FileUploader />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind={KIND.tertiary} onClick={() => setIsOpen(false)}>
            Cancel
          </ModalButton>
          <ModalButton onClick={saveChanges}>Save</ModalButton>
        </ModalFooter>
      </Modal>
      <Button
        kind={KIND.primary}
        onClick={() => setIsOpen(true)}
        size={BUTTON_SIZE.compact}
        shape={SHAPE.pill}
      >
        Edit Profile
      </Button>
    </>
  );
}
