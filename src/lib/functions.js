export function getAreaID(location) {
  let url = `https://purpletiger.taaja.io/v1/encode?longitude=${location[0]}&latitude=${location[1]}`;

  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.error("AreaID " + response.status);
        return false;
      }

      return response.json();
    })
    .then((json) => {
      return json.extensions[0]._id;
    })
    .catch(function (err) {
      console.log("Fetch Error :", err);
    });
}

export function getArea(id) {
  let url = `https://redcat.taaja.io/v1/extension/${id}`;

  return fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.error("Area " + response.status);
        return;
      }

      return response.json();
    })
    .catch(function (err) {
      console.log("Fetch Error :", err);
    });
}
