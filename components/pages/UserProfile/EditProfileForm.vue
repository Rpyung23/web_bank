<template>
  <card>
    <form @submit.prevent="updateProfile">
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="text"
              disabled
              label="Nombres Completos"
              placeholder="Nombres Completos"
              v-model="name_complete"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Saludo de bienvenida"
              placeholder="Saludo de bienvenida"
              v-model="welcome_msm"
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="text"
              label="Número de celular"
              placeholder="Número de celular"
              v-model="num_phone"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="email"
              label="Correo electrónico"
              placeholder="Correo electrónico"
              v-model="email_user"
            >
            </base-input>
          </div>
        </div>
        <div class="row" style="display: flex; justify-content: flex-end">
          <div class="col-lg-2">
            <base-button size="sm" type="success" native-type="submit">
              Actualizar mis datos
            </base-button>
          </div>
        </div>
      </div>
    </form>
    <form @submit.prevent="updateLimit">
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
            <base-input
              type="number"
              label="Límite Transferencia Diaria"
              placeholder="Límite Transferencia Diaria"
              v-model="limitdiaClient"
            >
            </base-input>
          </div>
          <div class="col-lg-6">
            <base-input
              type="number"
              label="Límite Transferencia Mensual"
              placeholder="Límite Transferencia Mensual"
              v-model="limitmesClient"
            >
            </base-input>
          </div>
        </div>

        <div class="row" style="display: flex; justify-content: flex-end">
          <div class="col-lg-2">
            <base-button size="sm" type="success" native-type="submit">
              Actualizar mis límites
            </base-button>
          </div>
        </div>

      </div>
    </form>
  </card>
</template>

<script>
export default {
  data() {
    return {
      name_complete: "",
      welcome_msm: "",
      num_phone: "",
      email_user: "",
      limitdiaClient:0,
      limitmesClient:0,
      limitdia:0,
      limitmes:0,
    };
  },
  methods: {
    async updateProfile() {
      try {
        var response = await this.$axios.put(
          `${process.env.baseUrl}/updateProfile`,
          {
            email: this.email_user,
            phone: this.num_phone,
            welcome: this.welcome_msm,
          },
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.$notify({
            message: "Su perfil ha sido actualizado con éxito.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
        } else {
          this.$notify({
            message: "Lo sentimos, no se han podido actualizar sus datos.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "danger",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        });
      }
    },
    async readProfile() {
      try {
        const response = await this.$axios.get(
          `${process.env.baseUrl}/profile_client`,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status === 200) {
          this.name_complete = `${response.data.clien_nom_clien} ${response.data.clien_ape_clien}`;
          this.welcome_msm = response.data.welcome_msm;
          this.num_phone = response.data.clien_tlf_celul;
          this.email_user = response.data.clien_dir_email;
        }
      } catch (error) {
        console.error("Error al leer el perfil:", error);
      }
    },
    async readLimiteDia(){
      try {
        const response = await this.$axios.get(
          `${process.env.baseUrl}/limit_transfer`,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        )

        console.log(response.data)

        if (response.status === 200) 
        {
          this.limitdia = response.data.limit_max_diario
          this.limitmes = response.data.limit_max_mensual
        }
      } catch (error) {
        console.error("Error al leer el perfil:", error);
      }
    },
    async readLimiteClient(){


      try {
        const response = await this.$axios.get(
          `${process.env.baseUrl}/limit_client_transfer`,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        )
        console.log("*********************")
        console.log(response.data)

        if (response.status === 200) 
        {
          this.limitdiaClient = response.data.limit_max_diario
          this.limitmesClient = response.data.limit_max_mensual
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        })
      }
    },
    async updateLimit() {
      try {

        if(this.limitdiaClient > this.limitdia)
      {
        this.$notify({
          message: 'Lo sentimos, el límite diario no puede exceder los '+this.limitdia+' dólares.',
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        })
        return
      }

      if(this.limitmesClient > this.limitmes)
      {
        this.$notify({
          message: 'Lo sentimos, el límite mensual no puede exceder los '+this.limitmes+' dólares.',
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        })
        return
      }
      
        var response = await this.$axios.put(
          `${process.env.baseUrl}/update_limit_transfer_client`,
          {
            limit_dia: this.limitdiaClient,
            limit_mes: this.limitmesClient
          },
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.$notify({
            message: "Sus límites han sido actualizado con éxito.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
        } else {
          this.$notify({
            message: "Lo sentimos, no se han podido actualizar sus límites.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "danger",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readProfile()
    this.readLimiteClient()
    this.readLimiteDia()
  },
};
</script>

<style>
/* Tu CSS aquí */
</style>
