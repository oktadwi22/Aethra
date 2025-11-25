
export async function handleLogin(userId: string, password: string) {
  const res = await fetch("/api/login-user", {
    method: "POST",
    body: JSON.stringify({ userId, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!data.success) {
    return(data.message);
  }

  // Redirect
  window.location.href = `/user/${data.userId}`;
}

export async function loginHost(address: string) {
  const res = await fetch("/api/login-host", {
    method: "POST",
    body: JSON.stringify({ address }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!data.success) {
    return(data.message);
  }

  if (data.redirect) {
    window.location.href = data.redirect;
  }
}

