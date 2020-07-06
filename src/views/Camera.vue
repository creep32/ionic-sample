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

      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="(each, index) in photos" :key="index">
            <ion-img :src="each.base64 ? each.base64 : each.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

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
  FilesystemDirectory,
  Storage,
  Capacitor,
} from '@capacitor/core';

function isPlatform(identify) {
  return identify === 'hybrid' && Capacitor.platform === 'web';
}

const { Camera, Filesystem } = Plugins;

async function readAsBase64(image) {
  if (!isPlatform('hybrid')) {
    return Promise.resolve(async () => {
      const file = await Filesystem.readFile({
        path: image.filePath,
      });
      return file.data;
    });
  }

  const response = await fetch(image.webPath);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
}

const PHOTO_STORAGE = 'photos';

export default {
  name: 'NewItemPage',
  data() {
    return {
      photos: [],
    };
  },
  async mounted() {
    // Retrieve cached photo array data
    const photos = await Storage.get({ key: PHOTO_STORAGE });
    const geted = JSON.parse(photos.value) || [];

    if (isPlatform('hybrid')) {
      geted.forEach(async (each) => {
        const photo = each;
        const readFile = await Filesystem.readFile({
          path: photo.filePath,
          directory: FilesystemDirectory.Data,
        });
        photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
        this.photos.push(photo);
      });
    } else {
      this.photos.push(...geted);
    }
  },
  methods: {
    async takePhoto() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const filePath = `${new Date().getTime()}.jpeg`;
      const base64 = await readAsBase64(image);
      const savedFile = await Filesystem.writeFile({
        path: filePath,
        data: base64,
        directory: FilesystemDirectory.Data,
      });

      if (!isPlatform('hybrid')) {
        this.photos.push({
          filePath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
          base64,
        });
      } else {
        this.photos.push({
          filePath,
          webviewPath: image.webPath,
          base64,
        });
      }

      Storage.set({
        key: PHOTO_STORAGE,
        value: isPlatform('hybrid')
          ? JSON.stringify(this.photos)
          : JSON.stringify(this.photos.map((p) => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
            const photoCopy = { ...p };
            delete photoCopy.base64;

            return photoCopy;
          })),
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
