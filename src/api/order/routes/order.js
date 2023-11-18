module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order",
      handler: "order.create",
    },
  ],
};
