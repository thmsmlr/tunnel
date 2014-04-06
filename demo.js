(function() {
  var cs_input = document.getElementById('cs-input')
    , cs_button = document.getElementById('cs-send')
    , cs_console = document.getElementById('cs-console');

  cs_button.addEventListener("click", function() {
    Tunnel.send('fromExtension', cs_input.value);
  });

  Tunnel.listen('toExtension', function(msg) {
    cs_console.innerText += "=> Received message from page: " + msg.toString() + "\n";
  });
})();
