<template>
  <div>
    <notifications></notifications>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8"></div>
    <!-- Page content -->

    <div
      class="container"
      style="margin-top: -10rem; display: flex; justify-content: center"
    >
      <card style="width: 50rem">
        <template slot="header">
          <el-steps
            style="width: 100%"
            :active="activeStepCreateAccount"
            finish-status="success"
          >
            <el-step title="Verifica tu identidad"></el-step>
            <el-step title="Verificación facial"></el-step>
            <el-step title="Crea tu usuario y contraseña"></el-step>
          </el-steps>
        </template>

        <div class="stepcreate1" v-if="activeStepCreateAccount == 0">
          <div class="row">
            <div class="col-md-6">
              <base-input
                label="Número de cédula"
                name="Número de cédula"
                minlength="1"
                v-model="numberDniPassCreateAccount"
                prepend-icon="ni ni-credit-card"
                placeholder="Número de cédula"
              ></base-input>
            </div>

            <div class="col-md-6">
              <base-input
                label="Código dactilar"
                name="Código dactilar"
                minlength="1"
                v-model="numberCodDactilarCreateAccount"
                prepend-icon="ni ni-credit-card"
                placeholder="Código dactilar"
              ></base-input>
            </div>
          </div>
        </div>

        <div
          class="stepcreate2"
          style="display: flex; justify-content: center"
          v-if="activeStepCreateAccount == 1"
        >
          <!--<div class="container-circle" v-if="!photoCapturedCreateAccount">
            <video ref="video" class="circulo" autoplay playsinline>
              <div class="circulo-negro">
                <img
                  src="../static/img/icons/camera.png"
                  style="color: white"
                  height="20px"
                  ;white="20px"
                />
              </div>
            </video>
          </div> -->

          <div class="profile-container">
            <div v-if="!photoCapturedCreateAccount">
              <video
                ref="video"
                style="
                  border-radius: 50%;
                  width: calc(45vh);
                  height: calc(45vh);
                  object-fit: cover;
                  border: 0.1rem solid #144c24;
                "
                autoplay
                playsinline
              ></video>
              <!--<base-button
                @click="capturePhoto"
                outline
                size="sm"
                icon
                type="success"
              >
                <span class="btn-inner--icon"
                  ><i class="ni ni-camera-compact"></i
                ></span>
              </base-button>-->
            </div>

            <div v-if="photoCapturedCreateAccount">
              <img
                style="
                  border-radius: 50%;
                  width: calc(45vh);
                  height: calc(45vh);
                  object-fit: cover;
                  border: 0.1rem solid #144c24;
                "
                :src="photoFacilCreateAccount"
                alt="Foto Capturada"
              />

              <!--<base-button
                @click="resetVideo"
                outline
                size="sm"
                icon
                type="danger"
              >
                <span class="btn-inner--icon"
                  ><i class="ni ni-fat-remove"></i
                ></span>
              </base-button>-->
              <!--<button @click="resetVideo">Tomar otra foto</button>-->
            </div>
          </div>
        </div>

        <div class="stepcreate3" v-if="activeStepCreateAccount == 2">
          <div class="row">
            <div class="col-md-6">
              <base-input
                label="Usuario Cooperativa Web/Móvil"
                name="Usuario Cooperativa Web/Móvil"
                prepend-icon="ni ni-single-02"
                placeholder="Usuario Cooperativa Web/Móvil"
                v-model="userCreateAccount"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                label="Confirmar Usuario Cooperativa Web/Móvil"
                name="Confirmar  Usuario Cooperativa Web/Móvil"
                prepend-icon="ni ni-single-02"
                placeholder="Confirmar  Usuario Cooperativa Web/Móvil"
                v-model="userConfirmCreateAccount"
              ></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <base-input
                label="Contraseña"
                name="Contraseña"
                prepend-icon="ni ni-key-25"
                v-model="passCreateAccount"
                placeholder="Contraseña"
                onfocus="this.setAttribute('type', 'password');"
                :rules="{ required: true, min: 8 }"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                label="Confirmar contraseña"
                name="Confirmar contraseña"
                prepend-icon="ni ni-key-25"
                placeholder="Confirmar contraseña"
                v-model="passConfirmCreateAccount"
                onfocus="this.setAttribute('type', 'password');"
                :rules="{ required: true, min: 8 }"
              ></base-input>
            </div>
          </div>
        </div>

        <template slot="footer">
          <div
            class="footercard"
            style="width: 100%; display: flex; justify-content: flex-end"
          >
            <base-button
              v-if="
                activeStepCreateAccount == 1 &&
                photoCapturedCreateAccount == true
              "
              size="sm"
              @click="resetVideo"
              outline
              type="danger"
              >Repetir</base-button
            >
            <base-button
              v-if="
                activeStepCreateAccount == 1 &&
                photoCapturedCreateAccount == false
              "
              size="sm"
              outline
              @click="capturePhoto"
              type="success"
              >Capturar</base-button
            >
            <base-button
              size="sm"
              v-if="activeStepCreateAccount == 0"
              @click="onClickCreateAccountStep()"
              type="success"
              >Continuar</base-button
            >
            <base-button
              v-if="activeStepCreateAccount == 2"
              @click="createAccount()"
              type="success"
              >Crear una nueva cuenta</base-button
            >
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { setupInactivityTimer } from "../util/functions";
import nuxtStorage from "nuxt-storage";
import swal from "sweetalert2";
import { Step, Steps } from "element-ui";
import "sweetalert2/dist/sweetalert2.css";
import { isUsernameValid, isPasswordValid } from "../util/functions";
import { validate } from "uuid";
export default {
  layout: "AuthLayout",
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  data() {
    return {
      activeStepCreateAccount: 0,
      photoCapturedCreateAccount: false,
      photoFacilCreateAccount: "",
      numberDniPassCreateAccount: null,
      numberCodDactilarCreateAccount: null,

      userCreateAccount: null,
      userConfirmCreateAccount: null,
      passCreateAccount: null,
      passConfirmCreateAccount: null,
      responseClientCod: null,
      responseWelcomeMsm: null,
      uuidPhoto: null,
    };
  },
  methods: {
    async uploadPictureFirebase(imageFile, uuid) {
      try {
        var storageRef = this.$fire.storage.ref().child(`face/${uuid}.jpg`);

        var snapshot = await storageRef.put(imageFile);
        //alert("File uploaded.");
        var downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
      } catch (e) {
        console.error("Error al subir la imagen:", e);
        return null;
      }
    },
    async deleteImage(uuid) {
      try {
        // Crea una referencia al archivo que deseas eliminar
        var storageRef = this.$fire.storage.ref().child(`face/${uuid}.jpg`);

        // Elimina el archivo
        await storageRef.delete();
        console.log("Imagen eliminada con éxito.");
        return true; // Devuelve true si la eliminación fue exitosa
      } catch (e) {
        console.error("Error al eliminar la imagen:", e);
        return false; // Devuelve false si hubo un error
      }
    },
    showProgressAlert() {
      swal.fire({
        text: `Por favor, espere un momento mientras procesamos su solicitud.`,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          swal.showLoading();
        },
      });
    },
    async onClickCreateAccountStep() {
      //this.startVideo();
      if (this.activeStepCreateAccount === 0) {
        if (
          !this.numberDniPassCreateAccount ||
          !this.numberCodDactilarCreateAccount
        ) {
          this.$notify({
            message:
              "Algunos campos de datos requieren obligatoriamente ser completados",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }
        await this.validateDniCodDac();
      }
    },
    async startVideo() {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "camera",
        });
        if (permissionStatus.state === "denied") {
          alert(
            "Has denegado el acceso a la cámara. Por favor, habilítalo en la configuración del navegador."
          );
          return;
        } else if (permissionStatus.state === "prompt") {
          alert(
            "Por favor, concede el acceso a la cámara cuando se te solicite."
          );
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // 'user' para cámara frontal
        });
        this.$refs.video.srcObject = stream;
      } catch (error) {
        console.error("Error accediendo a la cámara:", error);
      }
    },
    dataURLtoBlob(dataURL) {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    },
    async capturePhoto() {
      try {
        var video = this.$refs.video;
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        var context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        var imgCanvas = canvas.toDataURL("image/png");
        /*this.photoFacilCreateAccount = canvas.toDataURL("image/png");
        this.photoCapturedCreateAccount = true;*/
        // Convertir base64 a Blob para subirlo a Firebase
        var blob = this.dataURLtoBlob(imgCanvas);
        this.uuidPhoto = uuidv4(); // Asegúrate de tener un UUID o identificador único
        var downloadURL = await this.uploadPictureFirebase(
          blob,
          this.uuidPhoto
        );

        if (downloadURL != null) {
          this.showProgressAlert();
          this.photoFacilCreateAccount = downloadURL;
          this.photoCapturedCreateAccount = true;
          this.validateFaceID(downloadURL);
          //swal.close();
        }

        await this.stopVideo();
      } catch (error) {
        console.log("CATCH capturePhoto");
        console.log(error);
      }
    },
    stopVideo() {
      try {
        const video = this.$refs.video;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (error) {
        console.log("CATCH STOPVIDEO");
        console.log(error);
      }
    },
    async resetVideo() {
      this.photoCapturedCreateAccount = false;
      this.photoFacilCreateAccount = "";
      await this.startVideo();
    },
    async validateDniCodDac() {
      this.showProgressAlert();
      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/check_dni",
          {
            dni_client: this.numberDniPassCreateAccount,
            huella: this.numberCodDactilarCreateAccount,
            searchDni: true,
          }
        );

        swal.close();

        //console.log(response)

        if (response.status === 200) {
          this.responseClientCod = response.data.clien_cod_clien;
          this.responseWelcomeMsm = response.data.welcome_msm;

          if ((await this.isExistAccountName()) == false) {
            this.activeStepCreateAccount++;
            await this.startVideo();
          } else {
            this.$notify({
              message:
                "Lo sentimos, ya posee una cuenta de cooperativa móvil/web.",
              timeout: 4000,
              icon: "ni ni-fat-remove",
              type: "danger",
            })
            this.$router.push("/")
          }
        } else {
          this.$notify({
            message: "Lo sentimos, sus credenciales no han sido encontradas.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
      } catch (error) {
        console.error(error);
        this.$notify({
          message: "Lo sentimos, sus credenciales no han sido encontradas.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
      swal.close();
    },
    async validateFaceID(downloadURL) {
      //console.log(this.responseClientCod)
      //console.log(downloadURL);
      this.showProgressAlert();
      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/check_face_id/" + this.responseClientCod,
          {
            face_picture: downloadURL,
          }
        )

        console.log(response)
        console.log(response.data.similarity)

        swal.close();

        if (response.status == 200) {
          if (response.data.similarity >= 70) {
            this.deleteImage(this.uuidPhoto);
            this.activeStepCreateAccount++;
          } else {
            this.$notify({
              message:
                "Lo sentimos, no fue posible reconocer tus rasgos faciales 0 %",
              timeout: 2000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
          }
        } else {
          this.$notify({
            message:
              "Lo sentimos, no fue posible reconocer tus rasgos faciales 0 %",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error)
        swal.close();
        this.$notify({
          message:
            "Lo sentimos, no fue posible reconocer tus rasgos faciales 0 %",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    validateFormCreateAccount() {
      if (this.userCreateAccount == null || this.userCreateAccount == "") {
        this.$notify({
          message: "Por favor ingrese su usuario de la cooperativa virtual",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (
        this.userConfirmCreateAccount == null ||
        this.userConfirmCreateAccount == ""
      ) {
        this.$notify({
          message: "Por favor ingrese su usuario de la cooperativa virtual",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (isUsernameValid(this.userCreateAccount) == false) {
        this.$notify({
          message:
            "Lo sentimos, su usuario no es válido. Debe tener entre 8 y 14 caracteres, incluir al menos un número y una letra.",
          timeout: 4000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (this.userConfirmCreateAccount != this.userCreateAccount) {
        this.$notify({
          message:
            "Lo sentimos, su usuario de la cooperativa virtual no coincide",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      /**PASSS**/

      if (this.passCreateAccount == null || this.passCreateAccount == "") {
        this.$notify({
          message: "Por favor ingrese su contraseña de la cooperativa virtual",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (
        this.passConfirmCreateAccount == null ||
        this.passConfirmCreateAccount == ""
      ) {
        this.$notify({
          message: "Por favor ingrese su contraseña de la cooperativa virtual",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (isPasswordValid(this.passCreateAccount) == false) {
        this.$notify({
          message:
            "Lo sentimos, tu contraseña no es válida. Debe tener entre 8 y 16 caracteres, incluir al menos un número, una letra mayúscula, una letra minúscula y uno de los siguientes caracteres especiales: _*?!@#$/(){}=.,:;",
          timeout: 4000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      if (this.passCreateAccount != this.passConfirmCreateAccount) {
        this.$notify({
          message:
            "Lo sentimos, su usuario de la cooperativa virtual no coincide",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
        return false;
      }

      return true;
    },
    async isExisteUsername() {
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/isExistUsername/" + this.userCreateAccount
        );
        if (response.status == 200) {
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    },
    async createAccount() {
      try {
        if (this.validateFormCreateAccount()) {
          this.showProgressAlert();

          if (await this.isExisteUsername()) {
            var response = await this.$axios.post(
              process.env.baseUrl + "/createUserBanca",
              {
                usuario_banca: this.userCreateAccount.trim(),
                clien_cod_clien: this.responseClientCod,
                contrasenia_banca: this.passCreateAccount.trim(),
                welcome_msm: this.responseWelcomeMsm,
              }
            );

            if (response.status == 200) {
              swal.close();
              this.$notify({
                message:
                  "Su cuenta en la cooperativa virtual ha sido creada con éxito.",
                timeout: 2000,
                icon: "ni ni-check-bold",
                type: "success",
              });
              this.$router.push("/login");
            } else {
              this.$notify({
                message:
                  "Lo sentimos, no hemos podido crear su cuenta en la cooperativa virtual.",
                timeout: 2000,
                icon: "ni ni-fat-remove",
                type: "danger",
              });
              swal.close();
            }
          } else {
            swal.close();
            this.$notify({
              message:
                "Lo sentimos, el usuario " +
                this.userCreateAccount +
                " no está disponible.",
              timeout: 4000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
          }
        }
      } catch (error) {
        swal.close();
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    async isExistAccountName() {
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/isExistAccount/" + this.responseClientCod
        );
        if (response.status == 200) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return true;
      }
    },
  },
  mounted() {
    //this.startVideo();
    //this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router);
  },
  beforeDestroy() {
    /*if (this.cleanUpInactivityTimer) {
        this.cleanUpInactivityTimer();
      }*/
  },
};
</script>

<style>
.circulo {
  width: 40vh;
  height: 40vh;
  border: 1px solid #144c24; /* Grosor del borde */
  border-radius: 50%;
  position: relative;
  margin: 20px;
}

.circulo-negro {
  width: 30px;
  height: 30px;
  background-color: #172b4d; /*#e2e5e9;*/
  border-radius: 50%;
  position: absolute;
  bottom: 0; /* Al borde inferior */
  right: 1rem; /* Al borde derecho */
  transform: translate(-50%, -50%); /* Ajustar para que quede fuera del borde */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
