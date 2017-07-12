<template>
    <div>
    </div>
</template>

<script>
import Engine from '@/game/Engine';

export default {
    data () {
        return {
            engine: null
        };
    },
    mounted () {
        this.engine = new Engine();
        this.engine.begin({
            mode: this.$route.query.vs,
            $el: this.$el,
        });
    },
    destroyed () {
        this.engine.destroy();
    }
}
</script>

<style lang="stylus" scoped>

</style>

