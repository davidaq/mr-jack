<template>
    <div class="hello">
        <h1 class="gray--text">Mr. Jack</h1>
        <h4 class="gray--text">开膛手杰克</h4>

        <ul>
            <li><router-link to="/game?vs=tutor">教学关</router-link></li>
            <li><router-link to="/game?vs=ai">对战AI</router-link></li>
        </ul>
        <ul>
            <li><router-link to="/game?vs=net">网络对战</router-link></li>
            <li><router-link to="/game?vs=human">面对面对战</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
            };
        }
    };
</script>

<style lang="stylus" scoped>
.hello
    height 100%
    background url(../assets/hello-bg.jpg) no-repeat
    background-size cover
    &::before
        content ""
        display block
        height 1px

h1
    margin-top 100px
    font-size 46px
    font-weight 500

h4
    margin-bottom 50px

h1, h4
    color: #FFF
    text-shadow: 1px 1px 5px #000;

ul
    padding 0

li
    list-style none
    display inline-block

a
    display inline-block
    line-height 45px
    width 150px
    height 45px
    font-weight bold
    background #333
    text-decoration none
    color #fff
    transition: background 0.3s
    &:hover
        background #444

</style>

