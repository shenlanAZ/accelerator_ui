<template>
    <v-flex>
        <v-list-item @click="func">
            <v-list-item-icon>
                <v-icon>{{DEVICE_MODEL[deviceModel] || "mdi-spin mdi-orbit"}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{deviceName}}</v-list-item-title>
                <v-list-item-subtitle v-if="addr">{{addr}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="currentDevice">
                <v-list-item-title>
                    <v-icon color="#1E88E5">mdi-check-circle</v-icon>
                    此设备
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
    </v-flex>
</template>

<script>
const DEVICE_MODEL = {
  "windows":"mdi-laptop-windows",
  "macbook":"mdi-laptop-mac",
  "ios":"mdi-cellphone-iphone",
  "android":"mdi-cellphone-android",
  "firefox":"mdi-firefox",
  "chrome":"mdi-google-chrome",
  "edge-chromium":"mdi-microsoft-edge",
  "edge":"mdi-microsoft-edge-legacy",
  "safari":"mdi-apple-safari",
}

export default {
    name: "Device",
    data () {
        return{
          DEVICE_MODEL
        }
    },
    props:{
        deviceModel:String,
        deviceName:String,
        addr:String,
        currentDevice:Boolean,
        func:Function
    }
}
</script>

<style scoped>

</style>