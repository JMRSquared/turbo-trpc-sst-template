export function Web() {
  const web = new sst.aws.StaticSite("VideoCall", {
    path: "client/react",
    build: {
      output: "dist",
      command: "yarn build",
    },
  });

  return {
    url: web.url,
  };
}
