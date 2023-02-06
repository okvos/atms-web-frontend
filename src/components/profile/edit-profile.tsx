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
import { PutUserProfileRequest } from "@atms/api/request/user/profile";
import toast from "react-hot-toast";

export function EditProfile({
  updateProfileInfo,
}: {
  updateProfileInfo: (key: string, value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedBio, setUpdatedBio] = useState<string>("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState<string>("");

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function saveChanges() {
    setIsUpdating(true);

    try {
      const req = new PutUserProfileRequest({
        bio: updatedBio,
        display_name: updatedDisplayName,
        header_image_url: "",
      });
      await req.execute();
      toast.success("Your profile has been updated");
      updateProfileInfo(updatedDisplayName, updatedBio);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsUpdating(false);
    }
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
          <ModalButton
            onClick={saveChanges}
            disabled={isUpdating}
            isLoading={isUpdating}
          >
            Save
          </ModalButton>
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
