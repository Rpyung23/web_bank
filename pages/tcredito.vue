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
      <div class="row py-2">
      </div>
    </base-header>

    <!--Modal Add Contact-->
    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12">
          <ComponentPageTCreditoTable ref="ComponentPageContactTable"></ComponentPageTCreditoTable>
        </div>
      </div>
      <!--End tables-->
    </div>



  </div>
</template>
<script>


// Tables

import PageTCreditoTable from "@/components/pages/dashboard/PageTCreditoTable.vue";
import { setupInactivityTimer } from "../util/functions";
export default {
  layout: "DashboardLayout",
  components: {
    ComponentPageTCreditoTable:PageTCreditoTable,
  },
  data() {
    return {
      cleanUpInactivityTimer : null
    };
  },
  methods: {

  },
  mounted() {
    this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router);
  },
  beforeDestroy() {
    if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }
  },
};
</script>
<style></style>
