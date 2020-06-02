import React from "react";
import Link from "next/link";
import { Box, Card } from "@material-ui/core";
import { GraphQLClient } from "graphql-request";
const Create = ({ data }) => {
  console.log(".....a", data);
  return (
    <Box>
      {data.languages.map((item) => {
        return (
          <Box p={2} m={2}>
            <Card
              style={{
                padding: 16,
                margin: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 150,
              }}
              key={item.lid}
            >
              <Link href={"/language/[lid]"} as={`/language/${item.lid}`}>
                <a>{item.name}</a>
              </Link>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export const getServerSideProps = async () => {
  const client = new GraphQLClient(
    "https://api-eu-central-1.graphcms.com/v2/ckaxnhxfm01f001z919ed3jh1/master"
  );
  const data = await client.request(
    `{
      languages{
        name
        lid
        }
    }`
  );
  console.log(".....data", data);
  return {
    props: {
      data,
    },
  };
};
export default Create;
