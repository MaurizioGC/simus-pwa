<template>
  <div>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 v-for="museum in museums" :key="museum.id">
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs9>
                  <div>
                    <div class="subheading font-weight-medium">
                      {{ museum.title }}
                    </div>
                    <div>{{ museum.dateString }}</div>
                  </div>
                </v-flex>
                <v-flex xs3>
                  <v-img
                    contain
                    :src="`/thumbnails/${museum.baseImageName}.png`"
                    :srcset="`/thumbnails/${museum.baseImageName}.png 1x,
                             /thumbnails/${museum.baseImageName}@2x.png 2x`"
                    height="72px"
                    transition="false"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Museum } from '@/types';

@Component
export default class MuseoDettaglio extends Vue {
  @Prop({ type: Array, required: true }) museums!: Museum[];
}
</script>
