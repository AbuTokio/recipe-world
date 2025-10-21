import supabase from "../utils/supabase"

export async function uploadProfilePicture(file: File | null) {
  if (!file) return null

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error("User wurde nicht gefunden")
    return null
  }

  const filePath = `${user.id}/${file.name}`

  const { error: storageError } = await supabase.storage.from("img-profiles").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  })

  if (storageError) {
    console.error("Fehler beim Hochladen:", storageError)
    return null
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("img-profiles")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365)

  if (signedUrlError) {
    console.error("Fehler beim Erstellen der Signed URL:", signedUrlError)
    return null
  }

  return signedUrlData.signedUrl
}

export async function uploadRecipePicture(file: File | null, recipeId: string) {
  if (!file) return null

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error("User wurde nicht gefunden")
    return null
  }

  const filePath = `${user.id}/${recipeId}/${file.name}`

  const { error: storageError } = await supabase.storage.from("img-recipes").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  })

  if (storageError) {
    console.error("Fehler beim Hochladen:", storageError)
    return null
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("img-recipes")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365)

  if (signedUrlError) {
    console.error("Fehler beim Erstellen der Signed URL:", signedUrlError)
    return null
  }

  return signedUrlData.signedUrl
}
