module.exports = ({ env }) => ({
  "reading-time": {
    enabled: true,
    config: {
      contentTypes: {
        blog: {
          field: "readingTime",
          references: "content",
        },
      },
    },
  },
});
