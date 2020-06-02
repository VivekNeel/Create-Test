import { GraphQLClient } from "graphql-request";
const language = ({ name }) => {
  return <p>{name}</p>;
};
export const getStaticPaths = async () => {
  const client = new GraphQLClient(
    "https://api-eu-central-1.graphcms.com/v2/ckaxnhxfm01f001z919ed3jh1/master"
  );
  const { languages } = await client.request(
    `{
          languages{
            name
            lid
            }
        }`
  );
  const paths = languages.map(({ name, lid }) => {
    return {
      params: {
        lid: lid,
      },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  console.log(".....id", params);
  const client = new GraphQLClient(
    "https://api-eu-central-1.graphcms.com/v2/ckaxnhxfm01f001z919ed3jh1/master"
  );
  const data = await client.request(
    `query LanguagePageQuery($lid : String){
        languages(where : {lid : $lid}) {
            name
        }
      }`,
    { lid: params.lid }
  );
  console.log("....dta", data, params);
  return {
    unstable_revalidate: 1,
    props: {
      name: data.languages[0].name,
    },
  };
};
export default language;
