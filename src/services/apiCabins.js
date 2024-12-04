import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Error loading the cabins data");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

// function receives either the newcabin data or an id for the cabin to be edited
export async function createEditCabin(newCabin, id) {
  // Checking for existing image path
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Using Math.random to create a unique image name to prevent duplicates in the database
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //https://zwyjofwojucckieszzpn.supabase.co/storage/v1/object/public/cabin-images/image-name-here
  // Url path required to display the hosted image files in database
  // if hasImagePath use path else create new path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. CREATE/EDIT cabins
  // 1 A) Target the table "cabins" in supabase
  let dbQuery = supabase.from("cabins");

  // 1 B) CREATE
  if (!id) dbQuery = dbQuery.insert([{ ...newCabin, image: imagePath }]);

  // 1 C) EDIT
  if (id)
    dbQuery = dbQuery
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await dbQuery.select().single();

  if (error) {
    console.log(error);
    throw new Error("There was an error processing cabin");
  }

  // if new entry succesfull then the image file is uploaded to the image storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

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
