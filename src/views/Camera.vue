<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Cameras</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon name="camera" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>

  </ion-page>
</template>

<script>
import {
  Plugins,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';

const { Camera } = Plugins;

export default {
  name: 'NewItemPage',
  methods: {
    takePhoto: async () => {
      /* const image = */ await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
