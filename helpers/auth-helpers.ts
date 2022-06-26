const API_ROOT = `https://6485-38-96-179-206.ngrok.io`;

export const createOrUpdateUser = async (user: any) => {
  try {
    let userResp = await fetch(`${API_ROOT}/users?email=${user.email}`);
    // @ts-ignore
    userResp = userResp.json()
    // @ts-ignore
    if (userResp && userResp.json) {
      return;
    }
    console.log('TRY', user)
    const resp = await fetch(`${API_ROOT}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
      cache: 'no-cache',
    })
    return resp.json()
  } catch(e) {
    // TODO
    // return Promise.reject()
  }
}

