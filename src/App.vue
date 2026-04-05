<template>
  <div 
  class="contenedor-principal"
  :class="!fondo ? momento : ''"
  :style="fondo ? { backgroundImage: `url(${fondo})` } : {}"
>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view @cambiar-fondo="cambiarFondo" />

  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const fondo = ref("");

const cambiarFondo = (clase) => {
  fondo.value = clase;
};

const momento = computed(() => {
  const h = new Date().getHours();

  if (h >= 6 && h < 12) return "amanecer";
  if (h >= 12 && h < 18) return "dia";
  if (h >= 18 && h < 21) return "atardecer";
  return "noche";
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'century gothic', sans-serif;
  background: transparent;
}

nav {
  position: sticky;
  margin: 0 auto;
  width: fit-content;
  margin-top: 10px;
  top: 1px;

  padding: 12px 28px;
  border-radius: 18px;

  background: transparent !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);

  transition: all 0.3s ease;
  
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 12px;
  font-weight: 500;
  transition: all 0.25s ease;
}

nav a:hover {
  text-shadow: 0 0 8px rgba(255,255,255,0.6);
  transform: translateY(-1px);
}

nav:hover {
  transform: translateY(-2px);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Fondo dinámico según la etapa del día */
.contenedor-principal {
  min-height: 100vh;
  padding: 40px 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}


.amanecer {
  background-color: #ff9e80; 
  background-image: url('https://plus.unsplash.com/premium_photo-1667950277262-41988a181afd?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
}

.dia {
  background-color: #81d4fa;
  background-image: url('https://images.unsplash.com/photo-1732833038523-c1d87f03b951?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}

.atardecer {
  background-color: #fb8c00;
  background-image: url('https://plus.unsplash.com/premium_photo-1673002094297-b418f57d8403?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
}

.noche {
  background-color: #2e1a47;
  background-image: url('https://images.unsplash.com/photo-1706250058440-c1afbc984e31?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

}
</style>