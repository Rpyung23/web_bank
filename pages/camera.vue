<template>
    <div>
      <h1>Captura de Imagen</h1>
      <div v-if="!photoCaptured">
        <video ref="video" autoplay playsinline></video>
        <button @click="capturePhoto">Capturar Foto</button>
      </div>
      <div v-if="photoCaptured">
        <img :src="photo" alt="Foto Capturada" />
        <button @click="reset">Tomar otra foto</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photo: '',
        photoCaptured: false
      };
    },
    mounted() {
      this.startVideo();
    },
    methods: {
      async startVideo() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' } // 'user' para cámara frontal
          });
          this.$refs.video.srcObject = stream;
        } catch (error) {
          console.error('Error accediendo a la cámara:', error);
        }
      },
      capturePhoto() {
        const video = this.$refs.video;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.photo = canvas.toDataURL('image/png');
        this.photoCaptured = true;
        this.stopVideo();
      },
      stopVideo() {
        const video = this.$refs.video;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach(track => track.stop());
      },
      reset() {
        this.photoCaptured = false;
        this.photo = '';
        this.startVideo();
      }
    }
  };
  </script>
  
  <style scoped>
  video {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: block;
  }
  img {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: block;
  }
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  