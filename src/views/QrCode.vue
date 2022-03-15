  <template>
  <v-container fluid>
    <p v-if="error!=''" class="error">{{ error }}</p>
    <p class='decode-result mx-2'>Codice QR letto (Debug only): {{ result }}</p>
    <v-row justify="center" class="mx-2 mt-2">
      <v-responsive class="rounded-lg rounded-2">
        <qrcode-stream @decode='onDecode' @init='onInit' />
      </v-responsive>
    </v-row>
    <v-card class="mt-5">
      <v-img max-height="80px"
        src="../assets/istruzioniHeader.png"
      >
        <v-card-title @click.stop="showInstructions" class="justify-center white--text text-h3 font-weight-black">
          Istruzioni
        </v-card-title>
      </v-img>
      <v-card-text v-show="showNew">
        <v-row class="mt-2" align-content="space-between">
          <v-col
            cols="5"
            align="center"
            align-self="center"
          >
            <v-img
              src="../assets/qrcodeScan.gif"
            ></v-img>
          </v-col>
          <v-col>
            <v-list dense>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                class="ml-n2"
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { QrcodeStream } from 'vue-qrcode-reader';
// import { NewsArticle } from '@/types';

@Component({
  components: {
    QrcodeStream
  }
})
export default class MyFavourites extends Vue {
  result ='';
  error ='';
  showNew = false;
  /* eslint-disable */
  items= [{ text: 'Identificare il QRCode', icon: 'mdi-qrcode' },
          { text: 'Inquadrare', icon: 'mdi-camera-retake' },
          { text: 'Attendere i contenuti', icon: 'mdi-folder-multiple-image' }];

  onDecode (result: string) {
    this.result = result;
  }

  showInstructions(){
    this.showNew = !this.showNew;
    if (this.showNew){
      this.$vuetify.goTo(Number(9999), {duration:2000,offset:0,easing:'easeInOutCubic'})
    }
  }

  async onInit (promise: any) {
    try {
      await promise;
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        this.error = 'ERROR: you need to grant camera access permission';
      } else if (error.name === 'NotFoundError') {
        this.error = 'ERROR: no camera on this device';
      } else if (error.name === 'NotSupportedError') {
        this.error = 'ERROR: secure context required (HTTPS, localhost)';
      } else if (error.name === 'NotReadableError') {
        this.error = 'ERROR: is the camera already in use?';
      } else if (error.name === 'OverconstrainedError') {
        this.error = 'ERROR: installed cameras are not suitable';
      } else if (error.name === 'StreamApiNotSupportedError') {
        this.error = 'ERROR: Stream API is not supported in this browser';
      } else if (error.name === 'InsecureContextError') {
        this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
      } else {
        this.error = `ERROR: Camera error (${error.name})`;
      }
    }
  }
}
</script>
