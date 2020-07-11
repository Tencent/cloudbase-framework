const entry = require('./<%= entry %>');

(async () => {
  let app = entry;

  // support for async load app
  if (entry && entry.tcbGetApp && typeof entry.tcbGetApp === 'function') {
    app = await entry.tcbGetApp();
  }

  app.listen(<%= port || 80 %>);
})()
