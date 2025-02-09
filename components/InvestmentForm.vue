<template>
  <div v-if="isOpen" class="card p-4 mt-3">
<!--    <h3 class="text-center">Modifier l'Investissement</h3>-->
    <form @submit.prevent="validateAndSubmit">
      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Titre de l'opération</label>
        <input v-model="form.titreoperation" type="text" class="form-control" />
        <small v-if="errors.titreoperation" class="text-danger">{{ errors.titreoperation }}</small>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Entreprise</label>
        <input v-model="form.entreprise" type="text" class="form-control" />
        <small v-if="errors.entreprise" class="text-danger">{{ errors.entreprise }}</small>
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
        <small v-if="errors.etatAvancement" class="text-danger">{{ errors.etatAvancement }}</small>
      </div>

      <div class="mb-3 d-flex flex-column align-items-start justify-content-start">
        <label class="form-label">Enveloppe Prévisionnelle (€)</label>
        <input v-model="form.enveloppePrev"  step="any" type="number"  class="form-control"/>
        <small v-if="errors.enveloppePrev" class="text-danger">{{ errors.enveloppePrev }}</small>
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
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
export default {
  props: {
    investment: Object,
    isOpen: Boolean,
  },
  data() {
    return {
      form: { ...this.investment },
      errors: {},
    };
  },
  methods: {
    // Validate form fields before submitting
    validateForm() {
      this.errors = {};

      if (!this.form.titreoperation.trim()) {
        this.errors.titreoperation = "Le titre de l'opération est requis.";
      }

      if (!this.form.entreprise.trim()) {
        this.errors.entreprise = "L'entreprise est requise.";
      }

      if (!this.form.etatAvancement) {
        this.errors.etatAvancement = "Veuillez sélectionner un état.";
      }

      if (this.form.enveloppePrev === "" || this.form.enveloppePrev < 0) {
        this.errors.enveloppePrev = "Veuillez entrer une enveloppe prévisionnelle valide.";
      }

      return Object.keys(this.errors).length === 0; // Return true if no errors
    },

    async validateAndSubmit() {

      if (!this.validateForm()) {
        Object.values(this.errors).forEach((error) => {
          this.$toast.error(error)
        });
        return;
      }

      try {
        const data = await this.$axios.$patch(`/investment/${this.investment.id}`, this.form);
        this.$emit("updated", data);
        this.$toast.success("Mise à jour réussie !");
        this.closeForm();
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        this.$toast.error("Erreur lors de la mise à jour.");
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
.text-danger {
  color: var(--btn-delete);
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
