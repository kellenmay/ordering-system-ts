import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { connection } from './database';
import { resolvers, typeDefs } from './graphql';
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: () => {
        return {
            db: connection,
        };
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});
try {
    const { url } = await server.listen();
    console.log(`🚀  Server ready at ${url}`);
}
catch (err) {
    console.error(`Error starting server: ${err}`);
}
