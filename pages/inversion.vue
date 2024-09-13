<template>
  <div>
    <base-header class="pb-6">
      <!-- <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb></route-breadcrumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      Card stats -->
    </base-header>
    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row py-2">
        <div v-for="investment in mListInvestment" class="col-xl-3 col-md-6">
          <CardInvestmentComponent
            :title="investment.inver_cod_inver"
            type="gradient-success"
            :sub-title="investment.tinve_des_tinve"
          >
            <template slot="footer">
              <div
                class="classFooterCardPrestamo"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span class="text-nowrap overlay-container"
                  ><strong style="color: green;"><h3>{{ investment.saldo }}</h3></strong></span
                >
              </div>
            </template>
          </CardInvestmentComponent>
        </div>
      </div>
      <!--End tables-->
    </div>


  </div>
</template>
<script>

import CardInvestment from "@/components/argon-core/Cards/CardInvestment";

export default {
  layout: "DashboardLayout",
  components: {
    CardInvestmentComponent: CardInvestment,
  },
  data() {
    return {
      mListInvestment: [],
    };
  },
  methods: {
    async readAllInvesment() {
      //console.log(this.$jwtBancaWeb().token)

      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/investment",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        console.log(response.data);
        if (response.status == 200) {
          this.mListInvestment.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }

      //console.log(data)
    }
  },
  mounted() {
    //this.initBigChart(0);
    this.readAllInvesment();
  },
};
</script>
<style></style>
