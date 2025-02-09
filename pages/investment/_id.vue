<template>
  <div class='c-container mb-5'>
    <div class="card text-center">
      <div class="card-header">
        {{ investment.titreoperation }}
      </div>
      <div
        class="card-footer"
        :class="getStatusClass(investment.etatAvancement)"
      >
        {{ investment.etatAvancement }}
      </div>
      <div class="card-body container">
        <div class='row mt-3'>
          <div class='col-12 col-lg-6'>
            <p class="card-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#DF2935" class="me-3 bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
              {{ investment.ville }}
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#12355B" class="me-3 bi bi-buildings-fill" viewBox="0 0 16 16">
                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
              </svg>
              {{investment.lycee}}
            </p>

           <div class='row mt-5'>
              <p class='col text-end small-text'>Entreprise:</p>
              <p class='col text-start'>{{investment.entreprise}}</p>
            </div>
            <div class='row mb-4'>
              <p class='col text-end small-text'>Mandataire:</p>
              <p class='col text-start'>{{investment.mandataire}}</p>
            </div>

            <div class='row'>
              <p class='col text-end small-text'>Montant des Autorisations de Programme votées en Millions d'Euros:</p>
              <p class='col text-start'> &euro; {{investment.montantVotes}}</p>
            </div>
            <div class='row mb-4'>
              <p class='col text-end small-text'>Enveloppe prévisionnelle en millions d’euros:</p>
              <p class='col text-start'>&euro; {{investment.enveloppePrev}}</p>
            </div>

            <div class='row'>
              <p class='col text-end small-text'>Notification du marché:</p>
              <p class='col text-start'> {{formatDate(investment.notification)}}</p>
            </div>
            <div class='row'>
              <p class='col text-end small-text'>Attribution par la CAO:</p>
              <p class='col text-start'>{{formatDate(investment.cao)}}</p>
            </div>
            <div class='row'>
              <p class='col text-end small-text'>Année de livraison:</p>
              <p class='col text-start'>{{formatYear(investment.annee)}}</p>
            </div>
            <div class='row mb-4'>
              <p class='col text-end small-text'>Année d’individualisation: </p>
              <p class='col text-start'>{{formatYear(investment.aneeIndividualisation)}}</p>
            </div>

            <div class='row'>
              <p class='col text-end small-text'>Code UAI: </p>
              <p class='col text-start'>{{investment.codeuai}}</p>
            </div>
            <div class='row'>
              <p class='col text-end small-text'>Maîtrise d'œuvre: </p>
              <p class='col text-start'>{{investment.maitrise}}</p>
            </div>
            <div class='row'>
              <p class='col text-end small-text'>Mode de dévolution: </p>
              <p class='col text-start'>{{investment.modeDevolution}}</p>
            </div>

          </div>
          <div class='col-12 col-lg-6'>
            <GoogleMap :latitude="investment.latitude" :longitude="investment.longitude"/>

            <button class="btn btn btn-outline-warning mt-4" @click="toggleForm">modifier</button>

            <InvestmentForm
              v-if="isOpen"
              :investment="investment"
              :isOpen="isOpen"
              @close="isOpen = false"
              @updated="redirect"
            />

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import GoogleMap from '~/components/GoogleMap.vue';
import dateUtils from "@/utils/date";
import InvestmentForm from '~/components/InvestmentForm.vue';
export default {
  layout: 'default',
  components: {
    GoogleMap, InvestmentForm
  },
  async asyncData({ params, $axios }) {
    try {
      const data = await $axios.$get(`/investment/${params.id}`);
      // Extract first item if API response is an array
      const investment = Array.isArray(data) ? data[0] : data;
      return { investment };
    } catch (error) {
      console.error("Error fetching investment details:", error);
      return { investment: {} };
    }
  },
 data () {
    return {
      isOpen: false,
      investment: {},
    }
  },
  methods: {
    formatDate: dateUtils.formatDate,
    formatYear: dateUtils.formatYear,

    toggleForm() {
      this.isOpen = !this.isOpen;
    },

    async redirect() {
      try {
        // const updatedInvestment = await this.$axios.$get(`/investment/${this.investment.id}`);
        // this.investment = updatedInvestment;
       this.$router.push('/');
      } catch (error) {
        console.error("Error refreshing investment:", error);
      }
    },

    getStatusClass() {
      const statusMap = {
        "Opération livrée": "status-completed",
        "En Chantier": "status-in-progress",
        "Abandonné": "status-rejected",
        "Etude de maîtrise d'œuvre": "status-in-progress",
        "Sélection mandataire": "status-in-progress",
        "Suspendue": "status-rejected",
        "Sélection entreprise": "status-in-progress",
        "Sélection maîtrise d'œuvre": "status-in-progress",
        "Etudes et diagnostics": "status-in-progress",
      };

      return statusMap[this.investment.etatAvancement] || "status-default";
    }
  }
};
</script>
<style scoped>
  .c-container{
    align-content: center;
  }
  .card-header{
    font-size: 1.2em;
    font-weight: bold;
    color: var(--btn-blue);
    background-color: var(--bg-viol);
  }
  .card-footer{
    font-size: 0.9em;
    font-weight: bold;
  }
  .status-rejected {
    background-color: var(--btn-delete);
    opacity: 0.8;
    color: white;
    text-transform: uppercase;
  }
  .status-in-progress {
    background-color: var(--btn-darkviol);
    opacity: 0.8;
    color: white;
    text-transform: uppercase;
  }
  .status-completed {
    background-color:  var(--btn-edit);
    opacity: 0.8;
    color: white;
    text-transform: uppercase;
  }
  .small-text {
    font-size: 0.8em;
  }
  .btn-outline-warning{
    width: 400px;
    text-transform: uppercase;
  }
  @media (min-width: 1200px) {
    .c-container {
      margin: 0px 100px;
    }
  }

</style>
