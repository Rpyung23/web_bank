<template>
  <div>

    <base-header class="pb-6">
      <div class="row py-2">
      </div>
    </base-header>


    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12">
          <edit-profile-form></edit-profile-form>
        </div>
      </div>
      <!--End tables-->
    </div>


  </div>
</template>
<script>
  import EditProfileForm from '~/components/pages/UserProfile/EditProfileForm.vue';
  import UserCard from '~/components/pages/UserProfile/UserCard.vue';
  import ProgressTrackList from '~/components/widgets/ProgressTrackList.vue';

  export default {
    layout: 'DashboardLayout',
    components: {
      EditProfileForm,
      UserCard,
      ProgressTrackList
    }
  };
</script>
<style>
  .profile-header {
    background-image: url(/~/static/img/theme/profile-cover.jpg);
    background-size: cover;
    background-position: center top;
    min-height: 500px;
  }
</style>
