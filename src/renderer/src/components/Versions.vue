<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="node-version text-red-900">v{{ version }}</li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { version } from '../../../../package.json'

const versions = reactive({ ...window.electron.process.versions })
</script>
