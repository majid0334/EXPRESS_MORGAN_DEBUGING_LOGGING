import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const cashe = new InMemoryCache();
const apolloClient = new ApolloClient({
  url: "hhtp://localhost:8000/graphql",
  cashe,
});
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
createApp(App).use(router).use(apolloProvider).mount("#app");
