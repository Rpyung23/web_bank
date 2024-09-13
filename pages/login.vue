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
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Usuario"
                    :rules="{ required: true, email: false }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Usuario"
                    v-model="email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Contraseña"
                    :rules="{ required: true, min: 6 }"
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
                      >Ingresar</base-button
                    >
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light"
                ><small>Has olvidado tu contraseña?</small></router-link
              >
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light"
                ><small>Crear una nueva cuenta</small></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setupInactivityTimer } from '../util/functions';
import nuxtStorage from "nuxt-storage";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  layout: "AuthLayout",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
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
        this.showProgressAlert()
        var response = await this.$axios.post(
          process.env.baseUrl + "/login_client",
          {
            usuario: this.email,
            password: this.password,
          }
        );
        console.log(response.data)
        //var sessionLogin = useCookie('jwtNizag')

        await this.loginPagoFacil();
        await this.$cookies.set("jwtBancaWeb", response.data, 1);
        //nuxtStorage.sessionStorage.setData('jwtNizag', response.data,1,'d');
        //console.log(nuxtStorage.sessionStorage.getData('jwtNizag'));
        this.$router.push("/dashboard");
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

      swal.close()
    },
  },mounted(){
    //this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router);
  },
  beforeDestroy() {
    /*if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }*/
  }
};
</script>
