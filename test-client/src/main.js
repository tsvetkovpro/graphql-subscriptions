import Vue from 'vue'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
// New Imports
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import VueApollo from 'vue-apollo'

// Create the network interface
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    transportBatching: true,
})

// Create the subscription websocket client
const wsClient = new SubscriptionClient('ws://localhost:5000/subscriptions', {
    reconnect: true,
})

// Extend the network interface with the subscription client
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
)

// Create the apollo client with the new network interface
const apolloClient = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    connectToDevTools: true,
})

// Install the plugin like before
Vue.use(VueApollo, {
    apolloClient,
})

// Your app is now subscription-ready!
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
})