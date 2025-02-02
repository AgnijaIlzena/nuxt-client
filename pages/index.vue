<template>
  <div class='mt-5'>
    <p v-if="investments && !investments.length" class='notif'>Aucun investissement trouvé.</p>

    <div class="mb-3">
      <label class='title-label'>Filtrer des investissements</label>

      <div class="row">
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            v-model="filters.ville"
            placeholder="VILLE"
          />
        </div>

        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            v-model="filters.etatAvancement"
            placeholder="ETAT AVANCEMENT"
          />
        </div>

        <div class="col-md-4">
          <button @click="applyFilters" class="btn btn-classic">Rechercher</button>
          <button @click="resetFilters" class="btn btn-secondary ml-2">Réinitialiser</button>
        </div>
      </div>
    </div>

    <table class="table table-hover table-sm">
      <thead>
      <tr v-if="investments && investments.length">
        <th scope="col">#</th>
        <th scope="col">Titreoperation</th>
        <th scope="col">Entreprise</th>
        <th scope="col">Annee de livraison</th>
        <th scope="col">Ville</th>
        <th scope="col">Mandataire</th>
        <th scope="col">Ppi</th>
        <th scope="col">Lycee</th>
        <th scope="col">Notification du marche</th>
        <th scope="col">Codeuai</th>
        <th scope="col">Longitude</th>
        <th scope="col">Etat d'avancement</th>
        <th scope="col">Montant des ap votes en meu</th>
        <th scope="col">Cao attribution</th>
        <th scope="col">Latitude</th>
        <th scope="col">Maitrise d'oeuvre</th>
        <th scope="col">Mode de devolution</th>
        <th scope="col">Annee d'individualisation</th>
        <th scope="col">Enveloppe prev en meu</th>
      </tr>
      </thead>
      <tbody>
        <tr
          class="data-row"
          v-for="investment in investments" :key="investment.id"
          @click="$router.push(`/investment/${investment.id}`)"
        >
            <th scope="row">{{investment.id}}</th>
            <td>{{investment.titreoperation}}</td>
            <td>{{ investment.entreprise }}</td>
            <td>{{formatYear(investment.annee)}}</td>
            <td>{{investment.ville}}</td>
            <td>{{investment.mandataire}}</td>
            <td>{{investment.ppi}}</td>
            <td>{{investment.lycee}}</td>
            <td>{{formatDate(investment.notification)}}</td>
            <td>{{investment.codeuai}}</td>
            <td>{{investment.longitude}}</td>
            <td>{{investment.etatAvancement}}</td>
            <td>{{investment.montantVotes}}</td>
            <td>{{formatDate(investment.cao)}}</td>
            <td>{{investment.latitude}}</td>
            <td>{{investment.maitrise}}</td>
            <td>{{investment.modeDevolution}}</td>
            <td>{{formatYear(investment.aneeIndividualisation)}}</td>
            <td>{{investment.enveloppePrev}}</td>
        </tr>
      </tbody>
    </table>

  </div>


</template>

<script>
import dateUtils from "@/utils/date";
export default {
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      const investments = await $axios.$get('/investments');
      return { investments };
    } catch (error) {
      console.error("Error fetching investments:", error);
      return { investments: [] };
    }
  },
  data() {
    return {
      investments: [],
      filters: {
        ville: "",
        etatAvancement: ""
      }
    };
  },
  methods: {
    formatDate: dateUtils.formatDate,
    formatYear: dateUtils.formatYear,

    async fetchInvestments() {
      try {
        const response = await this.$axios.$get('/investments');
        this.investments = response;
      } catch (error) {
        console.error("Error fetching investments:", error);
        this.investments = [];
      }
    },

    openInvestmentDetails() {
      this.$router.push({ name: 'investment-details', params: { id: investment.id } });
    },

    async getInvestmentById(investmentId) {
      try {
        const { data } = await this.$axios.get(`/investment/${investmentId}`);
        console.log("data", data);
        return data;
      } catch (e) {
        console.error("Error fetching investment:", error);
      }
    },

    goToInvestmentDetails(investment) {
      this.$router.push({
        name: 'investment',
        params: { id: investment.id }
      });
    },

    async applyFilters() {
      try {
        const params = {};
        if (this.filters.ville) params.ville = this.filters.ville;
        if (this.filters.etatAvancement) params.etatAvancement = this.filters.etatAvancement;

        const response = await this.$axios.$get('/investments/filter', { params });
        this.investments = response;
      } catch (error) {
        console.error("Error applying filters:", error);
        this.investments = [];
      }
    },

    async resetFilters() {
      this.filters.ville = "";
      this.filters.etatAvancement = "";
      await this.fetchInvestments();
    }
  }
}
</script>
<style scoped>
  .notif{
    color: var(--btn-delete);
  }
  .title-label{
    text-transform: uppercase;
    color: var(--btn-darkviol);
  }
  .table thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .table .data-row{
    cursor: pointer;
  }
  .btn-classic{
    background-color: var(--btn-darkviol);
    color: white;
  }
</style>

