<template>

  <div>
    <MuseoDettaglio :museums="museums"></MuseoDettaglio>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import simusService from '../services/SimusService';
import MuseoDettaglio from '../components/MuseoDettaglio.vue';
import { Museum } from '@/types';

@Component({
  components: {
    MuseoDettaglio
  }
})
export default class TopStories extends Vue {
  museums: Museum[] = [];

  mounted () {
    simusService.getMuseums()
      .then((museums: Museum[]) => {
        this.museums = museums;
      });
  }
}
</script>
