<template>
    <div id="test">
        <button class="btn btn-primary btn-lg btn-block" type="button" @click="test">Test</button>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    },
    methods:{
        test(){
            // let api = "https://618fb9d2f6bf450017484a23.mockapi.io/test";
        }
    }
}
</script>

<style scoped>
    #test{
        width: 100%;
        padding:2em;
    }
    button{
        display: block;
        width: 100%;
    }
</style>