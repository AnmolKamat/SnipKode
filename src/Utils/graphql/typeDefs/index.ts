import { gql } from "graphql-tag";

const typeDefs = gql`
  type Code {
    key: String
    code: String
    _id: String
  }
  type Query {
    getCode(key: String): Code
  }
  type Mutation {
    addCode(key: String, code: String): String
  }
`;

export default typeDefs;
