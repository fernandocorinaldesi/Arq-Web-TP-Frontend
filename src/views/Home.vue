<template>
  <div class="home">
    <Wellcome/>
  </div>
</template>

<script>
// @ is an alias to /src
import Wellcome from '@/components/Wellcome.vue'

export default {
  name: 'Home',
  components: {
    Wellcome
  }
}
</script>
