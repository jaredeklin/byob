const getCred = async (event) => {
  event.preventDefault()
  const email = document.querySelector('#email').value;
  const appName = document.querySelector('#app').value;
  if (email && appName) {
    try {
      const response = await fetch('/authenticate', {
        method: 'POST',
        body: JSON.stringify({email, appName}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if(response.ok) {
        const token = await response.json();
        alert(`You got cred! Please write your token down. \nToken: ${token.token} \nDO NOT FORGET YOUR TOKEN.  FOR SECURITY PURPOSES, YOU WILL NOT BE ISSUED A REPLACEMENT!`)
      } else {
        alert(response.statusText)
      }
    }
    catch (error) { alert(error) }
  } else {
    alert('Please enter a valid email address and app name.')
  }
}

document.querySelector('button').addEventListener('click', getCred);
