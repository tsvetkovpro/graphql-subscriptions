<template>
    <div id="app" class="flex-center">
        <div class="panel item">
            <div class="panel-header">
                <div class="panel-title">{{hello}}</div>
            </div>
            <div class="panel-body">
                <div class="tile" v-for="tag in tags">
                    <div class="tile-icon">
                        <figure class="avatar">
                            <img src="https://picturepan2.github.io/spectre/img/avatar-1.png">
                        </figure>
                    </div>
                    <div class="tile-content">
                        <p class="tile-title">Tony Stark</p>
                        <p class="tile-subtitle">{{JSON.parse(tag.newMessage)['message']}}</p>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="input-group">
                    <input type="text" class="form-input" v-model="text" v-on:keyup.enter="send"
                           placeholder="Type something..">
                    <button class="btn btn-primary input-group-btn" v-on:click="send">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        name: 'app',
        data(){
            return {
                tags: [],
                text: ''
            }
        },
        methods: {
            send () {
                this.$apollo.mutate({
                    mutation: gql`mutation send($text: String!) { addMessage(message: $text)}`,
                    variables: {
                        text: this.text,
                    }
                })
                this.text = ''
            }
        },
        apollo: {
            hello: gql`{hello}`,
            $subscribe: {
                // When a tag is added
                tags: {
                    query: gql`subscription onNewMessage {newMessage}`,
                    variables: {},
                    result(data) {
                        this.tags.push(data)
                    },
                },
            }
        },
    }
</script>

<style>
    @import "/src/assets/spectre.min.css";

    body {
        background: #f2f2f2;
    }

    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .item {
        width: 300px;
        background: #fff;
    }

    .panel-body {
        max-height: 200px;
        min-height: 200px;
    }
</style>
