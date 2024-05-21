async function getChatbotList() {
  let res = await fetch(config.chatServer + '/api', {
    headers: {
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  };

  let data = await res.json();
  return data;
}