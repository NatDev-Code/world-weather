<template>
  <div class="detalle">
    <router-link to="/" class="volver">⬅ Volver</router-link>

    <div v-if="lugar" class="card">
      <h2>{{ lugar.nombre }}</h2>
      <p>{{ lugar.pais }}</p>

      <p v-if="temp !== null" class="temp">
        {{ getIcon(weatherCode) }} {{ temp }}°C
      </p>

      <p v-else class="loading">Cargando clima...</p>

      <button class="fav" @click.prevent="marcarFavorita(lugar.id)">
        {{ favorita == lugar.id ? "⭐" : "☆" }}
      </button>
    </div>

    <div v-else>
      <p>Lugar no encontrado</p>
    </div>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { lugares } from "../data/lugares.js";
import { imagenes } from "../data/imagenes";

const emit = defineEmits(['cambiarFondo'])

const route = useRoute();
const id = route.params.id;

const lugar = lugares.find((l) => l.id == id);

const temp = ref(null);
const weatherCode = ref(null);
const favorita = ref(null);

const fondo = computed(() => {
  return imagenes[lugar?.nombre];
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

onMounted(async () => {
  favorita.value = Number(localStorage.getItem("favorita"));

  emit("cambiar-fondo", fondo.value);

  if (lugar) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lugar.lat}&longitude=${lugar.lon}&current_weather=true`
    );
    const data = await res.json();
    temp.value = data.current_weather.temperature;
    weatherCode.value = data.current_weather.weathercode;
  }
});

const getIcon = (code) => {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  return "🌦️";
};
</script>

<style>
.card {
  max-width: 300px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 16px;
  background: #deb887;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.temp {
  font-size: 2rem;
  font-weight: bold;
}

.loading {
  opacity: 0.6;
  animation: fade 1s infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

.fav {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.volver {
  display: inline-block;
  margin-bottom: 20px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
