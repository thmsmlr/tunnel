(function() {
  Tunnel.listen('demoChannel', function(msg) {
    console.log("Chrome extension recieved message: " + msg);
  });
})();
