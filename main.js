window.onTunnelLoad = function() {
  document.getElementsByClassName("no-plugin")[0].style.display = 'none';

  var wp_input = document.getElementById('wp-input')
    , wp_button = document.getElementById('wp-send')
    , wp_console = document.getElementById('wp-console');

  wp_button.addEventListener("click", function() {
    Tunnel.send('toExtension', wp_input.value);
  });

  Tunnel.listen('fromExtension', function(msg) {
    wp_console.innerText += "=> Received message from plugin: " + msg.toString() + "\n";
  });

};
