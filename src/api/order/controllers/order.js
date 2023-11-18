"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { billingAddress, userName, email, phoneNumber, products } =
      ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          return {
            price_data: {
              currency: "ngn",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      await strapi
        .service("api::order.order")
        .create({ data: { userName, products } });

      return { message: "saved successfully" };
    } catch (e) {
      ctx.response.status = 500;
      return { error: { message: "An Error occured " } };
    }
  },
}));
