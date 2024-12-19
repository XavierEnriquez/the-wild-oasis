import supabase, { supabaseUrl } from "./supabase";

export async function signupApi({ fullName, email, password }) {
  const defaultAvatar = `${supabaseUrl}/storage/v1/object/public/avatars/default-user.jpg`;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: defaultAvatar } },
  });
  if (error) throw new Error(error.message);
}

export async function loginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  //   console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Changed Jonas code @lecture 397 to add avatar default image, upload and delete functionality
// https://zwyjofwojucckieszzpn.supabase.co/storage/v1/object/public/avatars/default-user.jpg
export async function updateCurrentUser({
  password,
  fullName,
  currentAvatar,
  newAvatar,
}) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateError)
    throw new Error("Error updating user:" + updateError.message);

  // 2. Upload new avatar image
  let fileName;

  if (!currentAvatar && !newAvatar) fileName = "default-user.jpg";
  if (currentAvatar && !newAvatar) return;

  if (newAvatar) {
    fileName = `avatar-${data.user.id}-${Date.now()}`;
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, newAvatar, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError)
      throw new Error("Error uploading avatar:" + storageError.message);

    // 2.1 Delete existing avatar file if checks pass
    const currAvatarFileName = currentAvatar.split("/").pop();
    if (
      currAvatarFileName !== "" &&
      currAvatarFileName !== "default-user.jpg" &&
      !storageError
    ) {
      const { error: deleteAvatarError } = await supabase.storage
        .from("avatars")
        .remove([currAvatarFileName]);
      if (deleteAvatarError) {
        throw new Error(
          "Error deleting the avatar file: " + deleteAvatarError.message
        );
      }
    }
  }

  // 3. Update avatar in the user
  // if no currentAvatar and no newAvatar file, fileName === "default-user.jpg"
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}

/*
// Jonas code @lecture 397.
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateError) throw new Error(updateError.message);

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}
*/
