window.swayauthInitialize = function (url, buttonID, callback) {
  const baseUrl = 'https://swayauth.com'
  const origin = window.location.origin
  const button = document.getElementById(buttonID);
  if (!button) return callback({ status: false, message: 'Unhandled button exception', data: null })
  button.addEventListener('click', function () {
    const isMobile = window.outerWidth < 650
    let windowProperties = `toolbar=no,menubar=no,directories=no,location=no,status=no,`;
    if (!isMobile) {
      let left = (screen.width - 800) / 2;
      let top = (screen.height - 600) / 2;
      windowProperties += `resizable=yes,width=700,height=650,top=${top},left=${left}`;
    }
    const popupWindow = window.open(url, 'Authentication', windowProperties);

    window.onmessage = (event) => {
      if (event.origin == baseUrl && event?.data?.title == 'SWAYAUTH-SOCIAL-AUTHENTICATION') {
        const allowedOrigins = event?.data?.body?.origins?.split(',') || [];
        if (!allowedOrigins.includes(origin)) {
          callback({ status: false, message: 'Invalid origin detected', data: null })
        } else {
          callback({ status: event?.data?.body?.status == 'true', message: event?.data?.body?.message || 'Unhandled exception', data: event?.data?.body?.status == 'true' ? event?.data?.body : null })
        }
        popupWindow.close();
      }
    }
  })
}
