import { codeModel } from "../../Mongoose";

const resolvers = {
  Query: {
    getCode: async (_: any, { key }: { key: string }) => {
      try {
        const code = await codeModel.findOne({ key });
        if (code) return code;
        else return "Not found";
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    addCode: async (_: any, { key, code }: { key: string; code: string }) => {
      try {
        const duplicates = await codeModel.find({ key: key });
        if (duplicates.length > 0) return "Key Already exists";
        else {
          const newCode = new codeModel({ key, code });
          await newCode.save();
          return "added the Code";
        }
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
};

export default resolvers;
