module.exports = {
  async beforeUpdate(event) {
    const { params, state } = event;
    const previousData = await strapi.query("api::blog.blog").findOne({
      where: { id: params.data.id },
      populate: {
        related_blogs: true,
        category: true,
        tags: true,
        main_image: true,
        author: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    state.previousData = previousData;
  },
  async afterUpdate(event) {
    const { result, state } = event;
    try {
      await fetch(`${process.env.FRONTEND_URL}/api/strapi/webhook`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`,
        },
        body: JSON.stringify({
          model: "blog",
          updatedEntry: result,
          previousEntry: state.previousData,
        }),
      });
    } catch (error) {
      console.error("Error while executing webhook for blog update:", error);
    }
  },
};
