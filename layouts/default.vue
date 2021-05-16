<template>
  <div id="app">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>
@font-face {
  font-family: "Cabin";
  src: url("/fonts/Cabin-Regular.ttf");
  font-display: swap;
}
@font-face {
  font-family: "Lobster";
  src: url("/fonts/Lobster-Regular.ttf");
  font-display: swap;
}
#app {
  font-family: 'Cabin', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*padding: 5px 5px auto 5px;*/
  background-color: rgb(240, 235, 235);
}
h1 {
  font-family: 'Lobster', cursive;
}
html {
  font-family: "Cabin",
    "Lobster",
    Arial,
    sans-serif !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*width: 100%;*/
  overflow-x: hidden;
}

*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  /*padding: 10px 30px;*/
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  /*padding: 10px 30px;*/
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
