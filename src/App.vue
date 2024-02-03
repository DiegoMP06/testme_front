<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
  .formkit-form {
    display: grid;
    gap: 1rem;
  }
  .formkit-label,
  .formkit-legend {
    font-weight: 700;
    font-size: 1rem;
    color:  rgb(6 95 70);
  }
  .formkit-outer {
    display: grid;
    gap: .6rem;
  }

  .formkit-input:not([type="submit"], [type="checkbox"], [type="radio"]) {
    display: block;
    width: 100%;
    padding: .5rem;
    border-bottom: .2rem solid rgb(6 95 70);
    color: rgb(2 44 34);
    outline: none;
  }

  .formkit-input:not([type="submit"], [type="checkbox"], [type="radio"])::placeholder {
    color: rgb(100, 163, 138);
  }

  .formkit-message {
    width: 100%;
    padding: .5rem 1rem .5rem 2.3rem;
    border-left: .4rem solid rgb(255, 56, 56);
    color: rgb(255, 56, 56);
    background-color: rgb(253, 240, 240);
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    border-radius: .3rem;
  }

  textarea.formkit-input {
    height: 10rem;
    resize: none;
  }

  .formkit-input[type="checkbox"],
  .formkit-input[type="radio"]  {
    margin-right: 1.5rem;
  }

  .formkit-input[type="submit"] {
    width: 100%;
    background-color: rgb(4 120 87);
    color: white;
    transition: 300ms all ease;
    padding: .7rem;
    font-size: .8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .formkit-input[type="submit"]:hover {
    background-color: rgb(6 78 59);
  }

  .formkit-options {
    padding: 1rem;
    display: grid;
    gap: .5rem;
  }

  .animar {
    transition: all 300ms ease;
  }

  .animar-h {
    transition: max-height 300ms ease, transform 300ms ease;
  }

  .barra-secundaria  {
    max-height: 100vh;
    transform: translateY(0); 
  }

  .barra-secunaria-activa {
    transform: translateY(-2rem); 
  }

  .max-h-full {
    max-height: 100vh;
  }

  .translate-submenu {
    --tw-translate-x: -24rem/* 384px */;
    transform: translateX(-24rem);
  }

</style>