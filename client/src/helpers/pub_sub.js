const PubSub = {
  publish: function (channel, payload) {
    console.log("PubSub published on ", channel);
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    console.log("PubSub subscribed on ", channel);
    document.addEventListener(channel, callback);
  }
};

module.exports = PubSub;
