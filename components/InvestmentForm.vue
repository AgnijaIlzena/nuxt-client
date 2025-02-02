<template>
  <div v-if="isOpen" class="card p-4 mt-3">
<!--    <h3 class="text-center">Modifier l'Investissement</h3>-->
    <form @submit.prevent="updateInvestment">
      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Titre de l'opération</label>
        <input v-model="form.titreoperation" type="text" class="form-control" />
      </div>

      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Entreprise</label>
        <input v-model="form.entreprise" type="text" class="form-control" />
      </div>

      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">État d'avancement</label>
        <select v-model="form.etatAvancement" class="form-select">
          <option value="">Sélectionnez un état</option>
          <option value="Opération livrée">Opération livrée</option>
          <option value="En Chantier">En Chantier</option>
          <option value="Abandonné">Abandonné</option>
          <option value="Etude de maîtrise d'œuvre">Etude de maîtrise d'œuvre</option>
          <option value="Sélection mandataire">Sélection mandataire</option>
          <option value="Suspendue">Suspendue</option>
          <option value="Sélection entreprise">Sélection entreprise</option>
          <option value="Sélection maîtrise d'œuvre">Sélection maîtrise d'œuvre</option>
          <option value="Etudes et diagnostics">Etudes et diagnostics</option>
        </select>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Enveloppe Prévisionnelle (€)</label>
        <input v-model="form.enveloppePrev"  step="any" type="number"  class="form-control"/>
      </div>

      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" @click="closeForm">
          Annuler
        </button>
        <button type="submit" class="btn btn-warning">
          Enregistrer les modifications
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    investment: Object,
    isOpen: Boolean,
  },
  data() {
    return {
      form: { ...this.investment },
    };
  },
  methods: {
    async updateInvestment() {
      try {
        const data = await this.$axios.$patch(`/investments/${this.investment.id}`, this.form);
        this.$emit("updated", data);
        this.closeForm();
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    },
    closeForm() {
      this.$emit("close");
      },
  },
};
</script>
<style scoped>
.form-label{
  text-transform: uppercase;
  color: var(--btn-darkviol);
  font-size: 0.8em;
  font-weight: 600;
}
</style>
