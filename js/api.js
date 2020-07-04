export async function searchInInternalServal(search) {
  const response = await fetch(`http://localhost:3000/api/search?query=${search}`);
  const data = await response.json();
  return data;
}
