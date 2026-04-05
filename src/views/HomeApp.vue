<template>
      <div class="contenido">
  <h1>Ciudades del Mundo</h1>

  <div class="search">
    <input
      v-model="busqueda"
      placeholder="Buscar ciudad..."
      class="search-input"
    />
  </div>

  <div class="grid">
    <router-link
      v-for="lugar in filtrados"
      :key="lugar.id"
      :to="{ name: 'Detalle', params: { id: lugar.id } }"
      class="card-home"
    >
      <h3>{{ lugar.nombre }}</h3>

      <small>{{ lugar.pais }}</small>
      <h3>{{ banderas[lugar.pais] }}</h3>

      <p v-if="temperaturas[lugar.id] !== undefined">
        🌡️ {{ temperaturas[lugar.id] }}°C
      </p>

      <p v-else class="loading">Cargando...</p>

      <button class="fav" @click.prevent="marcarFavorita(lugar.id)">
        {{ favorita == lugar.id ? "⭐" : "☆" }}
      </button>
    </router-link>
  </div>
 </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { lugares } from "../data/lugares.js";
import { banderas } from "../data/banderas";

const temperaturas = ref({});
const cargando = ref(true);

const busqueda = ref("");

const filtrados = computed(() =>
  lugares.filter((l) =>
    l.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  ),
);

const favorita = ref(null);


onMounted(async () => {
  favorita.value = Number(localStorage.getItem("favorita"));

  for (const lugar of lugares) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lugar.lat}&longitude=${lugar.lon}&current_weather=true`,
    );
    const data = await res.json();

    temperaturas.value[lugar.id] = data.current_weather.temperature;
  }

  cargando.value = false;
});

onMounted(() => {
  favorita.value = Number(localStorage.getItem("favorita"));
});

const marcarFavorita = (id) => {
  if (favorita.value === id) {
    favorita.value = null;
    localStorage.removeItem("favorita");
  } else {
    favorita.value = id;
    localStorage.setItem("favorita", id);
  }
};

const emit = defineEmits(["cambiar-fondo"])

onMounted(() => {
  emit("cambiar-fondo", null)
})


</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 20px;
  max-width: 1100px;
  gap: 20px;
  margin: 20px auto; 
  width: 100%;
}

.card-home {
  padding: 20px;
  border-radius: 14px;
  background: #008b8b;
  text-align: center;
  text-decoration: none;
  color: #333;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-home:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.12);
}

.search {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-input {
  width: 250px;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: #7c9cff;
  box-shadow: 0 0 0 3px rgba(124, 156, 255, 0.2);
}

.fav {
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
  margin-top: 10px;
}

.loading {
  font-size: 12px;
  opacity: 0.6;
}

.contenido {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; 
  text-align: center;
  padding: 20px;
  border-radius: 15px;
}
</style>
