<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Mis Contactos</h3>
        </div>
        <div
          class="col"
          style="
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
          "
        >
          <base-button size="sm" type="success" @click="showModalAddContact()"
            >NUEVO CONTACTO</base-button
          >
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive table"
      :data="mListContact"
      header-row-class-name="thead-light"
      :lazy="true"
    >
      <el-table-column
        label="NOMBRES y APELLIDOS"
        min-width="180"
        prop="namecontact"
      >
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.namecontact }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="C. BANCARIA"
        min-width="100"
        prop="num_ctadp_cod_ctadp"
      >
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.num_ctadp_cod_ctadp }}</div>
        </template>
      </el-table-column>

      <el-table-column label="T. CUENTA" min-width="120" prop="ticue_des_ticue">
      </el-table-column>

      <el-table-column
        label="INSTITUCIÓN BANCARIA"
        min-width="150"
        prop="ifina_nom_ifina"
      >
        <template v-slot="{ row }">
          <div class="font-weight-600">
            {{
              row.isexterno == 0
                ? "COOPERATIVA NIZAG LTDA"
                : row.ifina_nom_ifina
            }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="" min-width="80" prop="page">
        <template v-slot="{ row }">
          <base-button
            @click="deleteContact(row.id_cnxcontact)"
            icon
            type="danger"
            size="sm"
          >
            <span class="btn-inner--icon"
              ><i class="ni ni-fat-remove"></i
            ></span>
          </base-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Classic modal-->
    <modal size="xl" :show.sync="modalAddContact">
      <form>
        <div class="row" style="display: flex; justify-content: center">
          <div>
            <el-radio-group
              fill="#144c24"
              v-model="oRadioTypeContact"
              @change="changeTypeAccount"
            >
              <el-radio-button label="local">CONTACTO NIZAG LTDA</el-radio-button>
              <el-radio-button
                label="external"
              >OTRAS ENTIDADES BANCARIAS</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <base-input label="Entidad Bancaria">
              <el-select
                v-model="oSelectBank"
                :clearable="true"
                filterable
                :disabled="activeEntiddadBancaria"
                placeholder="Entidad Bancaria"
              >
                <el-option
                  v-for="option in mListInstitucionBank"
                  :key="option.ifina_cod_ifina"
                  :label="option.ifina_nom_ifina"
                  :value="option.ifina_cod_ifina"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>
          <div
            class="col-md-6"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              justify-items: center;
              align-content: center;
            "
          >
            <base-input
              style="width: 100%"
              label="Número de Cuenta"
              name="Número de Cuenta"
              :disabled="activeNumberAccount"
              v-model="valueNumberAccountContact"
              prepend-icon="ni ni-credit-card"
              placeholder="Número de Cuenta"
            ></base-input>
            <base-button
              v-if="isSearchAccountLocal"
              icon
              type="primary"
              @click="readDataContactLocal()"
              style="margin-left: 0.5rem"
              size="sm"
            >
              <span class="btn-inner--icon"><i class="fa fa-search"></i></span>
            </base-button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input label="Tipo de Cuenta">
              <el-select
                v-model="oSelectTypeAccount"
                :clearable="true"
                filterable
                :disabled="activeTypeAccount"
                placeholder="Tipo de Cuenta"
              >
                <el-option
                  v-for="option in mListTypeAccount"
                  :key="option.ticue_cod_ticue"
                  :label="option.ticue_des_ticue"
                  :value="option.ticue_cod_ticue"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              :disabled="activeNameClient"
              v-model="valueNameCompleteAccountContact"
              label="Nombres Completos"
              name="Nombres Completos"
              prepend-icon="fas fa-user"
              placeholder="Nombres Completos"
            ></base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input label="Tipo Identificación">
              <el-select
                v-model="oSelectTypeIdentity"
                :clearable="true"
                filterable
                :disabled="activeTypeIdentity"
                placeholder="Tipo Identificación"
              >
                <el-option
                  v-for="option in mListTypeIdentity"
                  :key="option.idTypeIdentity"
                  :label="option.detalleTypeIdentity"
                  :value="option.idTypeIdentity"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input
              :disabled="activeNumberIdentity"
              v-model="valueNumberIdentityContact"
              label="Número de Identificación"
              name="Número de Identificación"
              prepend-icon="ni ni-badge"
              placeholder="Número de Identificación"
            ></base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-model="valueEmailContact"
              label="Correo Electrónico"
              prepend-icon="fas fa-envelope"
              placeholder="Email"
            ></base-input>
          </div>
        </div>
      </form>

      <template slot="footer">
        <div></div>
        <base-button
          v-if="activiButtonSaveContact"
          @click="onClickButtonCreateContactModal()"
          type="primary"
          >Guardar Contacto</base-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import { Select, Option,RadioButton,RadioGroup } from "element-ui";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
export default {
  name: "page-visits-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [RadioButton.name]:RadioButton,
    [RadioGroup.name]:RadioGroup
  },
  data() {
    return {
      oRadioTypeContact: null,
      mListContact: [],
      mListInstitucionBank: [],
      mListTypeAccount: [],
      mListTypeIdentity: [
        { idTypeIdentity: 1, detalleTypeIdentity: "CEDULA" },
        { idTypeIdentity: 3, detalleTypeIdentity: "PASSAPORTE" },
        { idTypeIdentity: 2, detalleTypeIdentity: "RUC" },
      ],
      modalAddContact: false,
      oSelectTypeAccount: null,
      oSelectBank: null,
      oSelectTypeIdentity: null,
      isSearchAccountLocal: false,

      activiButtonSaveContact: false,

      activeNumberAccount: true,
      activeTypeAccount: true,
      activeNameClient: true,
      activeTypeIdentity: true,
      activeNumberIdentity: true,
      activeEntiddadBancaria:true,

      valueNumberAccountContact: null,
      valueNameCompleteAccountContact: null,
      valueNumberIdentityContact: null,
      valueEmailContact: null,
    };
  },
  methods: {
    async changeTypeAccount(){
      console.log("CHANGUE RADIO CONTACTO ");
      console.log(this.oRadioTypeContact);

      if(this.oRadioTypeContact == null){
        this.isSearchAccountLocal = false;
        this.inactiveAllInput();
      }
      if(this.oRadioTypeContact  == 'local')
      {
        this.inactiveAllInput();
          this.isSearchAccountLocal = true;
          this.activeNumberAccount = false;
          this.activeEntiddadBancaria = true
      }

      if(this.oRadioTypeContact  == 'external'){
        this.activeCreateAccountExterno();
      }
      console.log("************************************");
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
    clearAllInput() {
      this.valueNumberAccountContact = null;
      this.valueNameCompleteAccountContact = null;
      this.valueNumberIdentityContact = null;
      this.valueEmailContact = null;
      this.oSelectTypeAccount = null;
      this.oSelectTypeIdentity = null;
      this.oSelectBank = null
    },
    inactiveAllInput() {
      this.activeNumberAccount = true;
      this.activeTypeAccount = true;
      this.activeNameClient = true;
      this.activeTypeIdentity = true;
      this.activeNumberIdentity = true;
      this.activiButtonSaveContact = false;
      this.activeEntiddadBancaria = true
    },
    activeCreateAccountExterno() {
      this.activeNumberAccount = false;
      this.activeTypeAccount = false;
      this.activeNameClient = false;
      this.activeTypeIdentity = false;
      this.activeNumberIdentity = false;
      this.isSearchAccountLocal = false;
      this.activiButtonSaveContact = true;
      this.activeEntiddadBancaria = false
    },
    showModalAddContact() {
      this.oRadioTypeContact = null
      this.clearAllInput();
      this.inactiveAllInput();
      this.isSearchAccountLocal = false
      this.modalAddContact = !this.modalAddContact;
    },
    getObjBank(idBank) {
      var bank = this.mListInstitucionBank.find(
        (bank) => bank.ifina_cod_ifina == idBank
      );
      return bank || null;
    },
    async readAllContact() {
      this.mListContact = [];
      var response = await this.$axios.get(process.env.baseUrl + "/contacts", {
        headers: {
          Authorization: this.$jwtBancaWeb().token,
        },
      });
      if (response.status == 200) {
        this.mListContact.push(...response.data);
      }
      console.log(response.data);
    },
    async readAllListBank() {
      this.mListInstitucionBank = [];
      var response = await this.$axios.get(
        process.env.baseUrl + "/listbankactive"
      );
      if (response.status == 200) {
        this.mListInstitucionBank.push(...response.data);
      }
      console.log(response.data);
    },
    async readAllTypeAccount() {
      try {
        this.mListTypeAccount = [];
        var response = await this.$axios.get(
          process.env.baseUrl + "/type_account",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );
        if (response.status == 200) {
          this.mListTypeAccount.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async changueSelectBank(value) {
      this.clearAllInput();
      var bank = this.getObjBank(value);
      if (bank == null) {
        this.isSearchAccountLocal = false;
        this.inactiveAllInput();
      } else {
        if (bank.isexterno == 0) {
          this.inactiveAllInput();
          this.isSearchAccountLocal = true;
          this.activeNumberAccount = false;
        } else {
          this.activeCreateAccountExterno();
        }
      }
    },
    async checkContactExist(isexterno, dataExternal) 
    {
      if (isexterno == 1) {
        if (
          this.valueNumberAccountContact == null ||
          this.valueNameCompleteAccountContact == null ||
          this.valueNumberIdentityContact == null
        ) {
          swal.close();
          this.$notify({
            message:
              "Algunos campos de datos requieren obligatoriamente ser completados",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }
      }
      this.showProgressAlert();
      try {
        var response = await this.$axios.get(
          process.env.baseUrl +
            "/checkAccountExist/" +
            this.valueNumberAccountContact,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        //console.log(response.data)

        if (response.status == 200) {
          if (isexterno == 0) {
            await this.createContactLocal(dataExternal);
          } else {
            await this.createContactExternal(dataExternal);
          }
        }
      } catch (error) {
        this.$notify({
          message: "Número de cuenta ya registrado.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
      swal.close();
    },
    async readDataContactLocal() 
    {
      this.showProgressAlert()
      try {
        var response = await this.$axios.get(
        process.env.baseUrl + "/readnewdatacontactlocal/" + this.valueNumberAccountContact,
        {
          headers: {
            Authorization: this.$jwtBancaWeb().token,
          },
        }
      );
      if (response.status == 200) 
      {
        console.log(response.data);
        this.activiButtonSaveContact = true;
        //this.valueNumberAccountContact = response.data.
        this.valueNameCompleteAccountContact = response.data.ctadp_nom_impri;
        this.valueNumberIdentityContact = response.data.clien_ide_clien;
        this.valueEmailContact = response.data.clien_dir_email;
      }
      } catch (error) {
        this.$notify({
            message:
              "Lo sentimos, no se han encontrado datos de esa cuenta.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
      }

      swal.close()
    },
    onClickButtonCreateContactModal() 
    {
      if(this.oRadioTypeContact == 'local')
      {
        this.checkContactExist(0, {
            account: this.valueNumberAccountContact,
            name: this.valueNameCompleteAccountContact,
            codeContact: this.valueNumberIdentityContact,
            codifina: null,
            typecodecontact: 1,
            typeaccount: 1,
            email_contact: this.valueEmailContact,
          });
      }

      if(this.oRadioTypeContact == 'external')
      {
        var oBank = this.getObjBank(this.oSelectBank);
        if(oBank != null){
          this.createContactExternal({
            account: this.valueNumberAccountContact,
            name: this.valueNameCompleteAccountContact,
            codecontact: this.valueNumberIdentityContact,
            ifina_cod_ifina:oBank.ifina_cod_ifina,
            typecodecontact:this.oSelectTypeIdentity,
            email:this.valueEmailContact,
            typeaccount:this.oSelectTypeAccount
          });
        }else{
          this.$notify({
            message: "Por favor, seleccione una institución bancaria.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "danger",
          });
        }
      }

    },
    async createContactLocal(data) {
      console.log("CONTACTO CREATE LOCAL")



      this.showProgressAlert();
      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/createContactLocal",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.clearAllInput();
          this.readAllContact();
          this.$notify({
            message: "Contacto creado con éxito.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 3000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
      swal.close();
    },
    async createContactExternal(data) 
    {
      this.showProgressAlert();
      console.log(this.oRadioTypeContact);
      try {
        if (
          this.valueNumberAccountContact == null ||
          this.valueNameCompleteAccountContact == null ||
          this.valueNumberIdentityContact == null ||
          this.oSelectTypeAccount == null ||
          this.oSelectBank == null ||
          this.oSelectTypeIdentity == null
        ) {
          swal.close();
          this.$notify({
            message:
              "Algunos campos de datos requieren obligatoriamente ser completados",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        } else {
          //this.showProgressAlert();

          var response = await this.$axios.post(
            process.env.baseUrl + "/createContactExternal",
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: this.$jwtBancaWeb().token,
              },
            }
          );

          if (response.status == 200) {
            this.clearAllInput();
            this.readAllContact();
            this.$notify({
              message: "Contacto creado con éxito.",
              timeout: 2000,
              icon: "ni ni-check-bold",
              type: "success",
            });
          }
        }
      } catch (error) {
        this.$notify({
          message: "Lo sentimos, el contacto ya se encuentra creado.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }

      swal.close();
    },
    async deleteContact(contact) {
      try {
        var response = await this.$axios.delete(
          process.env.baseUrl + "/deleteContact",
          {
            data: { idContact: contact },
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.$notify({
            message: "El contacto ha sido eliminado con éxito",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
          this.readAllContact();
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 3000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readAllTypeAccount();
    this.readAllContact();
    this.readAllListBank();
  },
};
</script>
<style></style>
