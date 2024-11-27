<template>
  <div style="background-color: white">
    <notifications></notifications>

    <div class="row_web_coop_bank" style="background-color: #f4f6f9; margin: 0">
      <div
        class="item_step_nizag"
        style="background-color: white; height: 100vh"
      >
        <div class="header">
          <img
            src="../static/img/brand/logo_coop.png"
            height="65px"
            alt="NIZAG LTDA"
            class="logo"
            style="margin-bottom: 0.5rem"
          />
          <h2 style="margin-bottom: 0.5rem">
            <strong
              >Verifica en tu navegador que estás en Cooperativa Web.</strong
            >
          </h2>
        </div>

        <div
          class="verification"
          style="display: flex; justify-content: center; width: 100%"
        >
          <img
            src="../static/img/icons/login.png"
            height="300px"
            alt="Persona señalando"
            class="illustration"
          />
        </div>

        <div class="instructions">
          <p>
            <span><strong>01.</strong></span> Cuida tu usuario y contraseña
          </p>
          <p>
            <span><strong>02.</strong></span> Antes de ingresar tu contraseña,
            verifica que hayas ingresado correctamente tu nombre de usuario.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="container">
          <div class="row justify-content-center">
            <div>
              <div class="card border-0 mb-0">
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
                <div class="card-body">
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
                      name="user_user_random"
                      v-model="email"
                    >
                    </base-input>

                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-lock-circle-open"
                      type="password"
                      placeholder="Contraseña"
                      name="user_pass_random"
                      @keyup.enter="onSubmit()"
                      v-model="password"
                    >
                    </base-input>

                    <div class="text-center">
                      <base-button
                        type="success"
                        native-type="submit"
                        size="sm"
                        class="my-4"
                        @click="onSubmit()"
                        >Ingresar</base-button
                      >
                    </div>

                    <div class="col-12 text-center">
                      <router-link to="/create" class="text-success"
                        ><small>Crear una nueva cuenta</small></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6">
                  <small
                    class="text-success"
                    @click="onClickShowmodalRecoveryPass('p')"
                    >Has olvidado tu contraseña?</small
                  >
                </div>

                <div class="col-6 text-right">
                  <small
                    class="text-success"
                    @click="onClickShowmodalRecoveryPass('u')"
                    >Has olvidado tu usuario?</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal size="lg" :show.sync="modalRecoveryPass">
      <template slot="header">
        <div
          class="headerModalRecPassUsername"
          style="width: 100%; display: flex; flex-direction: column"
        >
          <h2>
            <strong style="color: #525f7f">{{
              titleModalRecoveryPassUsername
            }}</strong>
          </h2>
          <el-steps
            style="width: 100%; margin-top: 1rem"
            :active="activeStepCreateAccount"
            finish-status="success"
          >
            <el-step title="Verifica tu identidad"></el-step>
            <el-step title="Verificación facial"></el-step>
            <el-step :title="titleStep3"></el-step>
          </el-steps>
        </div>
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
            </base-button>
            <button @click="capturePhoto">Capturar Foto</button>-->
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
            </base-button>
            <button @click="resetVideo">Tomar otra foto</button>-->
          </div>
        </div>
      </div>

      <div
        class="stepcreate3"
        v-if="activeStepCreateAccount == 2 && typeRecoveryPassUser == 'p'"
      >
        <div class="row">
          <div class="col-md-6">
            <base-input
              label="Contraseña"
              name="Contraseña"
              prepend-icon="ni ni-key-25"
              placeholder="Contraseña"
              type="password"
              v-model="passCreateAccount"
            ></base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Confirmar contraseña"
              name="Confirmar contraseña"
              type="password"
              v-model="passConfirmCreateAccount"
              prepend-icon="ni ni-key-25"
              placeholder="Confirmar contraseña"
            ></base-input>
          </div>
        </div>
      </div>

      <div
        class="stepcreate3"
        v-if="activeStepCreateAccount == 2 && typeRecoveryPassUser == 'u'"
      >
        <div class="size"></div>
        <span style="margin-top: 1rem"
          >Estamado socio(a) le recordamos que el Usuario de su Coopertiva
          Virtual es :
          <strong style="color: #144c24">{{ userNameRecovery }}</strong
          ><br />Le recordamos mantener en un lugar seguro sus credenciales de
          acceso.</span
        >
      </div>

      <template
        slot="footer"
        style="width: 100%; display: flex; justify-content: flex-end"
      >
        <div></div>

        <base-button
          v-if="
            activeStepCreateAccount == 1 && photoCapturedCreateAccount == true
          "
          size="sm"
          @click="resetVideo"
          outline
          type="danger"
          >Repetir</base-button
        >
        <base-button
          v-if="
            activeStepCreateAccount == 1 && photoCapturedCreateAccount == false
          "
          size="sm"
          outline
          @click="capturePhoto"
          type="success"
          >Capturar</base-button
        >

        <base-button
          v-if="activeStepCreateAccount == 0"
          @click="onClickCreateAccountStep()"
          type="success"
          size="sm"
          >Continuar</base-button
        >

        <base-button
          v-if="activeStepCreateAccount == 2 && typeRecoveryPassUser == 'p'"
          @click="onResetPassword()"
          type="success"
          size="sm"
          >Restablecer Contraseña</base-button
        >
      </template>
    </modal>

    <modal size="lg" :show.sync="modalTermCondi">
      <template slot="header"> </template>

      <iframe
        style="border: none"
        :src="urlTermCondi"
        width="100%"
        height="450vh"
      ></iframe>

      <template slot="footer">
        <div></div>
        <base-button type="success" @click="AcceptTermCondi()" size="sm"
          >He leído y acepto los Términos y Condiciones.</base-button
        >
      </template>
    </modal>

    <modal
      :show.sync="modalOTP"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <form @submit.prevent>
          <div class="text-muted text-center mb-3">
            <small>Hola, {{data_response_login == null ? '' : data_response_login.first_name}}. Te hemos enviado un código de acceso vía SMS a tu celular</small>
          </div>
          <base-input
            placeholder="Código OTP"
            name="Código OTP"
            v-model="model_codigo_otp"
            @keyup.enter="checkOtp()"
            :required="true"
            type="number"
          ></base-input>
          <div class="buttons_otp">
            <base-button
              :disabled="active_repeat_code"
              type="secondary"
              size="sm"
              @click="getCodeOTP()"
              >Volver a generar código</base-button
            >
            <base-button
              
              type="success"
              size="sm"
              @click="checkOtp()"
              >Verificar</base-button
            >
          </div>
        </form>
      </card>
    </modal>
  </div>
</template>

<script>
import { isUsernameValid, isPasswordValid } from "../util/functions";
import { v4 as uuidv4 } from "uuid";
import { setupInactivityTimer } from "../util/functions";
import nuxtStorage from "nuxt-storage";
import swal from "sweetalert2";
import { Step, Steps } from "element-ui";
import "sweetalert2/dist/sweetalert2.css";
export default {
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  data() {
    return {
      email: "",
      password: "",
      modalRecoveryPass: false,
      modalOTP: false,
      activeStepCreateAccount: 0,
      photoCapturedCreateAccount: false,
      photoFacilCreateAccount: "",
      active_repeat_code: false,
      /**model para crear una nueva cuenta***/
      numberDniPassCreateAccount: null,
      numberCodDactilarCreateAccount: null,
      userCreateAccount: null,
      passCreateAccount: null,
      passConfirmCreateAccount: null,
      responseClientCod: null,
      modalTermCondi: false,
      urlTermCondi: null,
      titleModalRecoveryPassUsername: "Recuperar Nombre de Usuario",
      titleStep3: "Restablecer Contraseña",
      uuidPhoto: null,
      typeRecoveryPassUser: "p",
      userNameRecovery: "",
      codigo_otp: null,
      model_codigo_otp: null,
      //RESPALDO DE TOKEN
      data_response_login: null,
      data_response_login_pay: null,
    };
  },
  methods: {
    startCountdown(seconds) {
      let remaining = seconds

      const interval = setInterval(() => {
        console.log(`Quedan ${remaining} segundos.`);
        remaining--;

        if (remaining < 0) {
          clearInterval(interval); // Detener el temporizador
          console.log("¡El tiempo se acabó!");
        }
      }, 1000);

      // Detener todo después de los 60 segundos (como seguridad adicional)
      setTimeout(() => {
        clearInterval(interval)
        this.codigo_otp = null
        this.active_repeat_code = false
        //console.log("El temporizador se detuvo después de 60 segundos.");
      }, seconds * 1000);
    },
    async recoveryUsername() {
      try {
        this.showProgressAlert();
        var response = await this.$axios.get(
          process.env.baseUrl + "/recoveryUsername/" + this.responseClientCod
        );
        console.log(response);
        swal.close();
        if (response.status == 200) {
          this.userNameRecovery = response.data.pk_usuario_banca;
        } else {
          this.$notify({
            message:
              "Lo sentimos, no fue posible encontrar su usuario de la cooperativa virtual.",
            timeout: 3000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        swal.close();
        this.$notify({
          message:
            "Lo sentimos, no fue posible encontrar su usuario de la cooperativa virtual.",
          timeout: 3000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    validateForm() {
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
    async onResetPassword() {
      if (this.validateForm() == false) {
        return;
      }

      this.showProgressAlert();

      var response = await this.$axios.put(
        process.env.baseUrl + "/recovery_update_password",
        {
          idClient: this.responseClientCod,
          passw: this.passCreateAccount,
        }
      );
      this.modalRecoveryPass = false;
      swal.close();

      if (response.status == 200) {
        this.$notify({
          message: "Su contraseña ha sido actualizada con éxito.",
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "success",
        });
      } else {
        this.$notify({
          message: "Lo sentimos, no fue posible actualizar su contraseña.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
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
    async readUrlTermCondi() {
      try {
        var data = await this.$axios.get(process.env.baseUrl + "/urlexternal");
        console.log(data.data);
        this.urlTermCondi = data.data.url_term_condi;
        return data.data.url_term_condi;
      } catch (error) {
        console.log(error);
      }
      return null;
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
        this.data_response_login_pay = response.data.accessToken;
        /*this.$cookies.set("jwtBancaWebPagoFacil", response.data.accessToken, {
          path: "/",
          sameSite: "lax",
        })*/
      }
    },
    async checkOtp() {
      if (this.model_codigo_otp == "" || this.model_codigo_otp == "") 
      {
        this.$notify({
          message:
            "El código ingresado no es válido. Por favor, verifica e inténtalo nuevamente.",
          timeout: 3000,
          icon: "ni ni-bell-55",
          type: "danger",
        })
        return
      }

      if (this.model_codigo_otp == null || this.model_codigo_otp == null) {
        this.$notify({
          message:
            "El código ingresado no es válido. Por favor, verifica e inténtalo nuevamente.",
          timeout: 3000,
          icon: "ni ni-bell-55",
          type: "danger",
        })
        return
      }

      if (this.codigo_otp === this.model_codigo_otp) {
        try {
          this.$cookies.set("jwtBancaWeb", this.data_response_login, {
            path: "/",
            sameSite: "lax",
          });

          this.$cookies.set(
            "jwtBancaWebPagoFacil",
            this.data_response_login_pay,
            {
              path: "/",
              sameSite: "lax",
            }
          );

          this.$router.push("/dashboard");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$notify({
          message:
            "El código ingresado no es válido. Por favor, verifica e inténtalo nuevamente.",
          timeout: 3000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
      }
    },
    async getCodeOTP() {
      this.modalOTP = true
      this.model_codigo_otp = null
      this.codigo_otp = null
      this.active_repeat_code = true
      var response = await this.$axios.get(
        process.env.baseUrl + "/create_otp",
        {
          headers: {
            Authorization: this.data_response_login.token,
          },
        }
      )

      this.startCountdown(60)

      if (response.status == 200) {
        this.codigo_otp = response.data.otp;
        //console.log(this.codigo_otp);
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

        var termcond = await this.readUrlTermCondi();

        if (termcond != null) {
          var mi_ip = "";
          try {
            mi_ip = await this.obtenerIPLocal();
          } catch (error) {}

          //console.log(mi_ip)

          var response = await this.$axios.post(
            process.env.baseUrl + "/login_client",
            {
              usuario: this.email,
              password: this.password,
              isLocalAuth: false,
              ipaccess: mi_ip,
            }
          );

          if (response.status == 200) {
            /*await this.$cookies.set("jwtBancaWeb", response.data, {
              path: "/",
              sameSite: "lax",
            })*/

            this.data_response_login = response.data;

            await this.loginPagoFacil()

            if (response.data.accept_term_condition == 0) {
              swal.close()
              this.modalTermCondi = true;
            } else {
              swal.close()
              this.getCodeOTP()
              //this.$router.push("/dashboard")
            }
          } else {
            this.$notify({
              message: "No existen datos disponibles",
              timeout: 3000,
              icon: "ni ni-bell-55",
              type: "danger",
            });
          }
        } else {
          swal.close();
          this.$notify({
            message:
              "Lo sentimos, no hemos podido encontrar los términos y condiciones.",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        this.$notify({
          message:
            "Lo sentimos, no hemos podido encontrar los términos y condiciones.",
          timeout: 3000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
      }

      swal.close();
    },
    async cleanModalRecoveryPass() {
      this.passCreateAccount = null;
      this.passConfirmCreateAccount = null;
      this.numberDniPassCreateAccount = null;
      this.numberCodDactilarCreateAccount = null;
      this.photoCapturedCreateAccount = false;
      this.photoFacilCreateAccount = null;
      this.userNameRecovery = "";
    },
    onClickShowmodalRecoveryPass(type) {
      this.activeStepCreateAccount = 0;
      this.typeRecoveryPassUser = type;

      this.cleanModalRecoveryPass();

      if (type == "p") {
        this.titleModalRecoveryPassUsername = "Restabler Contraseña";
        this.titleStep3 = "Restablecer Contraseña";
      } else if (type == "u") {
        this.titleModalRecoveryPassUsername = "Recuperar Nombre de Usuario";
        this.titleStep3 = "Usuario Cooperativa Virtual";
      }
      this.modalRecoveryPass = !this.modalRecoveryPass;
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
        );

        swal.close();

        console.log("_________________RESPoNSE FACEID");
        console.log(response);

        if (response.status == 200) {
          if (response.data.similarity >= 70) {
            this.deleteImage(this.uuidPhoto);

            if (this.typeRecoveryPassUser == "u") {
              this.recoveryUsername();
            }
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
        swal.close();
        this.$notify({
          message: "Lo sentimos, sus credenciales no han sido encontradas.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    async AcceptTermCondi() {
      this.showProgressAlert();
      //console.log(this.$jwtBancaWeb().token)
      try {
        var response = await this.$axios.put(
          `${process.env.baseUrl}/accepTermCond`,
          {},
          {
            headers: {
              Authorization: this.data_response_login.token,
            },
          }
        );

        swal.close();

        if (response.status == 200) 
        {
          this.modalTermCondi = false
          this.getCodeOTP()
          //this.$router.push("/dashboard");
        } else {
          swal.close();
          this.$notify({
            message:
              "Lo sentimos, no hemos podido aceptar términos y condiciones.",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        }
      } catch (error) {
        swal.close();
        this.$notify({
          message:
            "Lo sentimos, no hemos podido aceptar términos y condiciones.",
          timeout: 3000,
          icon: "ni ni-bell-55",
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
<style>
.buttons_otp {
  display: flex;
  justify-content: space-between;
}
.el-step__title.is-process {
  font-weight: 600;
  color: #525f7f;
}

.row_web_coop_bank {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_step_nizag {
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
@media only screen and (max-width: 768px) {
  .item_step_nizag {
    display: none;
  }
}
</style>
