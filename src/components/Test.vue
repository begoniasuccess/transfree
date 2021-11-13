<template>
    <div class="test">
        <button class="btn btn-primary btn-lg btn-block" type="button" @click="test">Test</button>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    data(){
        return {

        }
    },
    methods:{
        test(){
            let api = "https://618fb9d2f6bf450017484a23.mockapi.io/test";
            Vue.axios.get(api).then((response) => {
                console.log(response.data)
            })
        }
    }
}
</script>

<style scoped>
    .test{
        width: 100%;;
    }
    button{
        display: block;
        width: 100%;
    }
</style>