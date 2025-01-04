import axios from "axios";

const URL = "http://localhost:8000";

function fetchLatePermission(authToken, setLatePermission) {
  axios
    .get(`${URL}/late-permission/fetch`, {
      headers: {
        authToken: authToken,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setLatePermission(res.data.request);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

async function cancelLatePermission(id, authToken) {
  try {
    const res = await axios.patch(
      `${URL}/late-permission/cancel`,
      { id },
      {
        headers: {
          authToken: authToken,
        },
      }
    );

    if (res.status === 200) {
      alert(res.data.message);
      return Promise.resolve();
    } else {
      throw new Error("Failed to cancel late permission");
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Error cancelling late permission");
    }
  }
}

async function raiseLatePermission(data, authToken) {
  try {
    const res = await axios.post(
      `${URL}/late-permission/request`,
      data,
      {
        headers: {
          authToken: authToken,
        },
      }
    );

    if (res.status === 200) {
      alert(res.data.message);
      return Promise.resolve();
    } else {
      throw new Error("Failed to cancel late permission");
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Error raising late permission");
    }
  }
}


export { fetchLatePermission, cancelLatePermission, raiseLatePermission };
