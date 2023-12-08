import gql from "graphql-tag";

const ADD_CODE = gql`
  mutation AddCode($key: String, $code: String) {
    addCode(key: $key, code: $code)
  }
`;

const GET_CODE = gql`
  query Query($key: String) {
    getCode(key: $key) {
      key
      code
      _id
    }
  }
`;

const queries = {
  ADD_CODE,
  GET_CODE,
};
export default queries;
