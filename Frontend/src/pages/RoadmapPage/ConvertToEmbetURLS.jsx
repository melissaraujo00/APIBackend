export default function ConvertToEmbetURLS(url) {
  // Expresión regular para extraer el ID del video de diferentes tipos de enlaces
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([\w-]{11})/;

  // Intentamos hacer match con la URL
  const match = url.match(regex);

  // Si hay coincidencia, formamos el enlace embebido; si no, retornamos null
  if (match) {
    const videoID = match[1];
    return `https://www.youtube.com/embed/${videoID}`;
  } else {
    return null; // Si no es un enlace de YouTube válido
  }
}
