import Head from "next/head";

export default function HeadComponent({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="A web app that queries information about every country from the REST Country API"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
