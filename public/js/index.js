const getCred = async () => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const appName = document.querySelector('#app').value;
  const validEmail = validateEmail(email);
  if (!validEmail) {
    return alert('Please enter a valid email address.');
  }
  if (email && appName) {
    try { 
      fetchToken(email, appName);
    } catch (error) { 
      alert(error); 
    }
  } else {
    alert('Please enter a valid email address and app name.');
  }
};

document.querySelector('button').addEventListener('click', getCred);

const validateEmail = (email) => {
  // eslint-disable-next-line
  return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
};

const fetchToken = async (email, appName) => {
  const response = await fetch('/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email, appName }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const token = await response.json();
    alert(`You got cred! Please write your token down. \nToken: ${token.token} \nDO NOT FORGET YOUR TOKEN.  FOR SECURITY PURPOSES, YOU WILL NOT BE ISSUED A REPLACEMENT!`); // eslint-disable-line
  } else {
    alert(response.statusText);
  }
};
