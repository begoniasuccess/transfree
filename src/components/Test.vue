<template>
    <div id="test">
        <button class="btn btn-primary btn-lg btn-block" type="button" @click="test">
            Test
        </button>
    </div>
</template>

<script>
import { getCurrentLocation } from "../utils/location";
export default {
    data(){
        return {

        }
    },
    methods:{
        test(){
            getCurrentLocation()
                .then((geoRes)=>{
                    console.log({getCurrentLocation:geoRes});
                }).catch((err)=>{
                    console.log({getCurrentLocation:err});
                });
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