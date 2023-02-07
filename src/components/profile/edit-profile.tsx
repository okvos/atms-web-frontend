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
import { toast } from "@atms-modules";
import { uploadImage } from "@atms/modules/uploads";
import { Profile } from "@atms/api/models";

export function EditProfile({
  updateProfileInfo,
  profile,
}: {
  updateProfileInfo: (
    key: string,
    value: string,
    headerImageKey: string
  ) => void;
  profile: Profile;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedBio, setUpdatedBio] = useState<string>(profile.bio);
  const [updatedDisplayName, setUpdatedDisplayName] = useState<string>(
    profile.username
  );
  const [updatedHeaderKey, setUpdatedHeaderKey] = useState<string>(
    profile.header_image_url
  );

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [isHeaderUploaded, setIsHeaderUploaded] = useState<boolean>(false);

  async function uploadHeaderImage(files: File[]) {
    const headerKey = await uploadImage(files[0]);
    if (!headerKey) {
      return toast("error", "Header not uploaded. Please try another image.");
    }
    setUpdatedHeaderKey(headerKey);
    setIsHeaderUploaded(true);
  }

  async function saveChanges() {
    setIsUpdating(true);

    try {
      const req = new PutUserProfileRequest({
        bio: updatedBio,
        display_name: updatedDisplayName,
        header_image_url: updatedHeaderKey,
      });
      await req.execute();
      toast("success", "Your profile has been updated");
      updateProfileInfo(updatedDisplayName, updatedBio, updatedHeaderKey);
    } catch (e: any) {
      toast("error", e.message);
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
              value={updatedDisplayName}
            />
          </FormControl>

          <FormControl label="Bio" caption="Describe yourself!">
            <Input
              onChange={(e) => setUpdatedBio(e.target.value)}
              placeholder="Bio"
              clearOnEscape
              value={updatedBio}
            />
          </FormControl>

          <FormControl
            label="Header Image"
            caption="Change your existing header image"
          >
            <FileUploader
              onDrop={uploadHeaderImage}
              onCancel={() => {
                setUpdatedHeaderKey(profile.header_image_url);
                setIsHeaderUploaded(false);
              }}
              multiple={false}
              accept={["image/png", "image/jpeg", "image/gif"]}
              progressAmount={isHeaderUploaded ? 100 : undefined}
              progressMessage={
                isHeaderUploaded ? "Uploaded! Don't forget to save." : undefined
              }
            />
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
