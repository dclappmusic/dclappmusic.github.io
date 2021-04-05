<template>
    <div class="page manifest">
      <div class="cabecera">
        <h2 class="display-big">A DÓNDE QUEREMOS LLEGAR</h2>   
      </div>
      <div class="view">
        <p class="parr">No somos ni pertenecemos a ninguna corporación, ni tenemos ningún plan secreto para utilizar vuestros datos para venderlos a EvilCorp.</p>
        <p class="parr">Somos un equipo pequeño muy frikis de la música en directo y de las bandas genuinas, y queremos poner nuestro granito (o granazo si puede ser) de arena para mejorar una escena en riesgo</p>
        <p class="parr">Creamos weclapp en 2018 tras saturarnos de escucharnos decir estas frases:</p>
        <ul>
          <li class="parr">Este concierto ha sido la leche, le daría todo mi escaso dinero a la banda para que siguiese tocando.</li>
          <li class="parr">Y oootro festival indie en verano con los mismos 5 grupos que entre todos suman 2 discos.</li>
          <li class="parr">¿Cómo es que ha este grupazo sólo han ido a verles 25 personas?</li>
          <li class="parr">Otro grupo que se disuelve porque no les da ni para púas.</li>
          <li class="parr">“Si es que si no te promocionas en Instagram con videos de postureo no llegas a nada”</li>
        </ul>
        <p class="parr">Así que decidimos juntarnos y montar esto, pero no de cualquier manera</p>
      </div>
    </div>
</template>

<script>

export default {
    name: 'Manifiesto',
    props: [],
    components: {},
    data() {
        return {
        }
    },
    created() {
    }
}
</script>
<style scoped lang="scss">
.page {
  background: var(--color-fondo-degradado-fans);
  --color_texto: var(--color-light);
}
</style>
