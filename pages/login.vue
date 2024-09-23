<template>
  <div>
    <notifications></notifications>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8"></div>
    <!-- Page content -->
    <div class="container mt--9 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <!--<div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="~/static/img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="~/static/img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>-->
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <img
                  src="../static/img/brand/logo_coop.png"
                  style="height: 3.5rem; width: 9.5rem"
                  alt=""
                  srcset=""
                />
              </div>
              <div>
                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Usuario"
                  v-model="email"
                >
                </base-input>

                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Contraseña"
                  v-model="password"
                >
                </base-input>

                <div class="text-center">
                  <base-button
                    type="primary"
                    native-type="submit"
                    class="my-4"
                    @click="onSubmit()"
                    >Ingresar</base-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light"
                ><small>Has olvidado tu contraseña?</small></router-link
              >
            </div>
            <div class="col-6 text-right">
              <router-link to="/create" class="text-light"
                ><small>Crear una nueva cuenta</small></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal size="lg" :show.sync="modalCreateAccount">
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

      <div class="stepcreate2" v-if="activeStepCreateAccount == 1">
        <div style="display: flex; justify-content: center">
          <div v-if="!photoCapturedCreateAccount">
            <video
              ref="video"
              style="
                border-radius: 50%;
                width: calc(50vh);
                height: calc(50vh);
                object-fit: cover;
                border: 0.1rem solid #144c24;
              "
              autoplay
              playsinline
            ></video>
            <base-button
              @click="capturePhoto"
              outline
              size="sm"
              icon
              type="success"
            >
              <span class="btn-inner--icon"
                ><i class="ni ni-camera-compact"></i
              ></span>
            </base-button>
            <!--<button @click="capturePhoto">Capturar Foto</button>-->
          </div>

          <div v-if="photoCapturedCreateAccount">
            <img
              style="
                border-radius: 50%;
                width: calc(50vh);
                height: calc(50vh);
                object-fit: cover;
                border: 0.1rem solid #144c24;
              "
              :src="photoFacilCreateAccount"
              alt="Foto Capturada"
            />

            <base-button
              @click="resetVideo"
              outline
              size="sm"
              icon
              type="danger"
            >
              <span class="btn-inner--icon"
                ><i class="ni ni-fat-remove"></i
              ></span>
            </base-button>
            <!--<button @click="resetVideo">Tomar otra foto</button>-->
          </div>
        </div>
      </div>

      <div class="stepcreate3" v-if="activeStepCreateAccount == 2">
        <div class="row">
          <div class="col-md-12">
            <base-input
              label="Usuario Cooperativa Web/Móvil"
              name="Usuario Cooperativa Web/Móvil"
              prepend-icon="ni ni-single-02"
              placeholder="Usuario Cooperativa Web/Móvil"
            ></base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <base-input
              label="Contraseña"
              name="Contraseña"
              prepend-icon="ni ni-key-25"
              placeholder="Contraseña"
            ></base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Confirmar contraseña"
              name="Confirmar contraseña"
              prepend-icon="ni ni-key-25"
              placeholder="Confirmar contraseña"
            ></base-input>
          </div>
        </div>
      </div>

      <template slot="footer">
        <div></div>
        <base-button @click="onClickCreateAccountStep()" type="success"
          >Continuar</base-button
        >
      </template>
    </modal>
  </div>
</template>

<script>
import { setupInactivityTimer } from "../util/functions";
import nuxtStorage from "nuxt-storage";
import swal from "sweetalert2";
import { Step, Steps } from "element-ui";
import "sweetalert2/dist/sweetalert2.css";
export default {
  layout: "AuthLayout",
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  data() {
    return {
      email: "",
      password: "",
      modalCreateAccount: false,
      activeStepCreateAccount: 0,
      photoCapturedCreateAccount: false,
      photoFacilCreateAccount: "",
      /**model para crear una nueva cuenta***/
      numberDniPassCreateAccount: null,
      numberCodDactilarCreateAccount: null,
      userCreateAccount: null,
      passCreateAccount: null,
      passconfirmCreateAccount: null,
      responseClientCod: null,
    };
  },
  methods: {
    async obtenerIPLocal() {
      return new Promise(function (resolve, reject) {
        var pc = new RTCPeerConnection({
          iceServers: [],
        });

        // Crea un canal de datos vacío
        pc.createDataChannel("");

        // Crea una oferta y establece la descripción local
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .catch((error) => {
            console.error("Error al crear la oferta:", error);
            resolve(""); // En caso de error, retornar cadena vacía
          });

        // Al encontrar una nueva ICE candidate
        pc.onicecandidate = function (event) {
          if (event && event.candidate && event.candidate.candidate) {
            // Extraer la IP de la cadena candidate
            var ipMatch = event.candidate.candidate.match(
              /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/
            );
            if (ipMatch) {
              pc.close(); // Cerrar la conexión
              resolve(ipMatch[0]); // Devolver la IP local encontrada
            }
          } else if (!event.candidate) {
            // Si no se encuentra candidato, retornar cadena vacía
            resolve("");
          }
        };
      });
    },

    showProgressAlert() {
      swal.fire({
        text: `Por favor, espere un momento mientras procesamos su solicitud.`,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false, // No permite el cierre al hacer clic fuera del modal
        allowEscapeKey: false,
        didOpen: () => {
          swal.showLoading();
        },
      });
    },
    async loginPagoFacil() {
      var response = await this.$axios.get(
        process.env.baseUrl + "/AuthPagoFacil"
      );
      if (response.status == 200) {
        this.$cookies.set("jwtBancaWebPagoFacil", response.data.accessToken);
      }
    },
    async onSubmit() {
      try {
        //console.log(this.email)
        //console.log(this.password)

        if (this.email == null || this.email.trim() == "") {
          this.$notify({
            message:
              "Por favor, ingrese su usuario para la cooperativa virtual.",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        if (this.password == null || this.password.trim() == "") {
          this.$notify({
            message:
              "Por favor, ingrese su contraseña para la cooperativa virtual.",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        this.showProgressAlert();

        var mi_ip = "";

        try {
          mi_ip = await this.obtenerIPLocal();
        } catch (error) {}

        console.log(mi_ip)

        var response = await this.$axios.post(
          process.env.baseUrl + "/login_client",
          {
            usuario: this.email,
            password: this.password,
            isLocalAuth: false,
            ipaccess: mi_ip,
          }
        );

        //console.log(this.password)
        if (response.status == 200) {
          console.log(response);
          //var sessionLogin = useCookie('jwtNizag')

          await this.loginPagoFacil();
          await this.$cookies.set("jwtBancaWeb", response.data, 1);
          //nuxtStorage.sessionStorage.setData('jwtNizag', response.data,1,'d');
          //console.log(nuxtStorage.sessionStorage.getData('jwtNizag'));
          this.$router.push("/dashboard");
        } else {
          this.$notify({
            message: "No existen datos disponibles",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.$notify({
            message: error.response.data.msm,
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        }
      }

      swal.close();
    },
    onClickShowModalCreateAccount() {
      this.modalCreateAccount = !this.modalCreateAccount;
    },
    async onClickCreateAccountStep() {
      //this.startVideo();
      if (this.activeStepCreateAccount == 0) {
        if (
          this.numberDniPassCreateAccount == null ||
          this.numberDniPassCreateAccount == "" ||
          this.numberCodDactilarCreateAccount == null ||
          this.numberCodDactilarCreateAccount == ""
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
        var permissionStatus = await navigator.permissions.query({
          name: "camera",
        });
        if (permissionStatus.state === "denied") {
          // Si el permiso está denegado, muestra un mensaje al usuario
          alert(
            "Has denegado el acceso a la cámara. Por favor, habilítalo en la configuración del navegador."
          );
          return;
        } else if (permissionStatus.state === "prompt") {
          // Si el permiso aún no se ha solicitado, muestra un mensaje
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
    async capturePhoto() {
      ///await this.startVideo()
      const video = this.$refs.video;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photoFacilCreateAccount = canvas.toDataURL("image/png");
      this.photoCapturedCreateAccount = true;
      await this.stopVideo();
    },
    stopVideo() {
      const video = this.$refs.video;
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
    },
    async resetVideo() {
      this.photoCapturedCreateAccount = false;
      this.photoFacilCreateAccount = "";
      await this.startVideo();
    },
    async validateDniCodDac() {
      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/check_dni",
          {
            dni_client: this.numberDniPassCreateAccount,
            huella: this.numberCodDactilarCreateAccount,
            searchDni: true,
          }
        );

        if (response.status == 200) {
          this.responseClientCod = response.data.clien_cod_clien;
          this.activeStepCreateAccount = this.activeStepCreateAccount + 1;
          await this.startVideo();
        } else {
          this.$notify({
            message: "Lo sentimos, sus credenciales no han sido encontradas.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    //this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router);
  },
  beforeDestroy() {
    /*if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }*/
  },
};
</script>
