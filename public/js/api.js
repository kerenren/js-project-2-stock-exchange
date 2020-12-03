export async function searchInInternalServal(search) {
  const response = await fetch(`https://fierce-savannah-58662.herokuapp.com/api/search?query=${search}`);
  const data = await response.json();
  return data;
}
