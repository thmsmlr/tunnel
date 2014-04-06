(function() {

  function injectTunneller() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "(" + initialize.toString() + ")();";
    document.body.appendChild(script);
  }

  var initialize = function() {

    var EVENT_NAME = "tunnelMessage";

    // Ensure event is initialized
    var tunnelEvent = document.createEvent("Event");
    tunnelEvent.initEvent(EVENT_NAME, true, true);

    // Check if channel already exists, if not, create it.
    // Returns channel node.
    var createChannel = function(channel) {
      channel = "tunnel-" + channel;
      var channelNode = document.getElementById(channel);

      if(channelNode === undefined || channelNode === null) {
        channelNode = document.createElement("div");
        channelNode.id = channel;
        channelNode.style.display = "none";
        document.body.appendChild(channelNode);
      }

      return channelNode;
    }


    window.Tunnel = {
      /*
       * Send a message through the tunnel
       *
       * channel - Name of the channel to communicate through
       * msg     - arbitrary message
       *
       */
      send: function(channel, msg) {
        var channelNode = createChannel(channel);
        channelNode.innerText = JSON.stringify(msg);
        channelNode.dispatchEvent(tunnelEvent);
      },

      /*
       * Add an listener for a message on a given channel
       *
       * chanel - Name of the channel to listen to
       * cb     - callback function
       *
       */
      listen: function(channel, cb) {
        var channelNode = createChannel(channel);
        channelNode.addEventListener(EVENT_NAME, function() {
          var msg = JSON.parse(channelNode.innerText);
          cb(msg);
        });
      }
    }

    window.onTunnelLoad && window.onTunnelLoad();
  }

  injectTunneller();
  initialize();

})();
