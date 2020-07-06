<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item v-for="(each, index) in list" :key="index">
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>
            <h1>{{ each.title}}</h1>
            <ion-note>{{ each.subtitile }}</ion-note>
          </ion-label>
          <ion-badge color="success" slot="end">{{ index}} Days</ion-badge>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click='getList'>
           <ion-icon name="list-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="center" horizontal="end" slot="fixed">
        <ion-fab-button @click="$router.push({name: 'camera' })">
           <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getList() {
      const data = await axios.get('https://ukjg3im0qb.execute-api.ap-northeast-1.amazonaws.com/Prod/hello/');
      this.list = data.data;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
