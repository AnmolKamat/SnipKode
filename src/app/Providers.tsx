"use client";
import { ApolloProvider } from "@apollo/client";
import React, { ReactNode } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
  cache: new InMemoryCache(),
});

const Providers = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Providers;
