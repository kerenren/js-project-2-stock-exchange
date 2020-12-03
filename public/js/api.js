export async function searchInInternalServal(search) {
  const response = await fetch(`https://stock-exchange-js.herokuapp.com/api/search?query=${search}`);
  const data = await response.json();
  return data;
}
