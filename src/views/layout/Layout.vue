<template>
    <div>
        <div >
          <div style="height:50px;width:100%;z-index:99;position:fixed;left:0px;top:0px"> <navbar></navbar></div>
        </div>
        <app-main :style="{'height':appMainHeight+'px'}"></app-main>

        <div style="height:70px;width:100%;z-index:99;position:fixed;bottom:0px"> <bottommenu></bottommenu></div>


    </div>
</template>

<script>
    import breadcrumb from '@/components/Breadcrumb'
    import { navbar,appMain,bottommenu} from './components'
    export default {
        name: 'layout',
        components: {
            navbar,
            appMain,
            breadcrumb,
          bottommenu
        },
        data() {
            return {
                appMainHeight:document.body.clientHeight-90
            }
        },

        computed:{
          listenshowpage1() {
            return this.$root.title;
          },
            fullMap(){
                return this.$store.state.app.fullMap
            }
        },
        created () {
            this.listenerChangeAppMainHeight()
        },
        methods:{
            listenerChangeAppMainHeight(){
                this.$root.$on('changeAppMainHeight',(o) => {
                    this.appMainHeight=document.body.clientHeight-o;
                })
            }

        }
    }
</script>
<style lang="scss">
.app-query{
margin: auto auto 10px auto
}
</style>

