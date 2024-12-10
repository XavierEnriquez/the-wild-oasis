import supabase, { supabaseUrl } from "./supabase";

export async function getCabinsFn() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Error loading the cabins data");
  }
  return data;
}
export async function deleteCabinFn(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

// function receives either the new cabin data or an id for the cabin to be edited
export async function createUpdateCabinFn(id, cabinData) {
  // Check if newCabin is defined
  if (!cabinData) {
    throw new Error("No cabin data provided");
  }
  // Checking for existing image path
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  // Using Math.random to create a unique image name to prevent duplicates in the database
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );

  //https://zwyjofwojucckieszzpn.supabase.co/storage/v1/object/public/cabin-images/image-name-here
  // Url path required to display the hosted image files in database
  // if hasImagePath use path else create new path
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. CREATE/EDIT cabins
  // 1 A) Target the table "cabins" in supabase
  let query = supabase.from("cabins");

  // 1 B) CREATE
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);

  // 1 C) EDIT
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("There was an error processing cabin");
  }

  // 2 UPLOAD image
  // for cabin edits or cabin duplicates, if there is an image path, return function and to avoid uploading the image again to the database
  if (hasImagePath) return data;

  // if new entry is succesfull and ther is no existing image path, then the image file is uploaded to the image storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  // If can not upload the cabin image then delete the cabin entry just created
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Image could not be uploaded and new entry was not created"
    );
  }

  return data;
}

/*
export async function createUpdateCabinFn({ id, newCabin }) {
  // Check if newCabin is defined
  if (!newCabin) {
    throw new Error("No cabin data provided");
  }

  // Handle cases where image might be undefined
  const imageFile = newCabin.image;
  let imagePath = null;

  if (imageFile) {
    const hasImagePath =
      typeof imageFile === "string" && imageFile.startsWith(supabaseUrl);

    if (hasImagePath) {
      imagePath = imageFile;
    } else if (imageFile instanceof File) {
      const imageName = `${Math.random()}-${imageFile.name}`.replaceAll(
        "/",
        ""
      );
      imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

      // Upload image
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, imageFile);

      if (storageError) {
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded");
      }
    } else {
      throw new Error("Invalid image data");
    }
  }

  // Prepare cabin data for database
  const cabinData = { ...newCabin };
  if (imagePath) {
    cabinData.image = imagePath;
  }

  // Create/edit cabin
  let query = supabase.from("cabins");

  if (!id) {
    // CREATE
    query = query.insert([cabinData]);
  } else {
    // EDIT
    query = query.update(cabinData).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }

  return data;
}
*/
