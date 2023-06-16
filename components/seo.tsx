import  Head  from "next/head";

export default function Seotags({ user }: { user: any }) {
  const metaDescription = user?.seoInputs?.metaDescription;
  const metaTitle = user?.seoInputs?.metaTitle;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} key='desc' />
    </Head>
  );
}